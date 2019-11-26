#!/usr/bin/env python
"""Fully-connected neural network example using MNIST dataset

This code is a custom loop version of train_mnist.py. That is, we train
models without using the Trainer class in chainer and instead write a
training loop that manually computes the loss of minibatches and
applies an optimizer to update the model.
"""
from __future__ import print_function

import argparse

import chainer
from chainer.dataset import convert
import chainer.links as L
from chainer import serializers

from chainerui.utils import LogReport

import train_mnist


def main():
    parser = argparse.ArgumentParser(description='Chainer example: MNIST')
    parser.add_argument('--batchsize', '-b', type=int, default=100,
                        help='Number of images in each mini-batch')
    parser.add_argument('--epoch', '-e', type=int, default=20,
                        help='Number of sweeps over the dataset to train')
    parser.add_argument('--gpu', '-g', type=int, default=-1,
                        help='GPU ID (negative value indicates CPU)')
    parser.add_argument('--out', '-o', default='result',
                        help='Directory to output the result')
    parser.add_argument('--resume', '-r', default='',
                        help='Resume the training from snapshot')
    parser.add_argument('--unit', '-u', type=int, default=1000,
                        help='Number of units')
    args = parser.parse_args()

    print('GPU: {}'.format(args.gpu))
    print('# unit: {}'.format(args.unit))
    print('# Minibatch-size: {}'.format(args.batchsize))
    print('# epoch: {}'.format(args.epoch))
    print('')

    # Set up a neural network to train
    model = L.Classifier(train_mnist.MLP(args.unit, 10))
    if args.gpu >= 0:
        # Make a speciied GPU current
        chainer.cuda.get_device_from_id(args.gpu).use()
        model.to_gpu()  # Copy the model to the GPU

    # Setup an optimizer
    optimizer = chainer.optimizers.Adam()
    optimizer.setup(model)

    # Load the MNIST dataset
    train, test = chainer.datasets.get_mnist()

    train_count = len(train)
    test_count = len(test)

    train_iter = chainer.iterators.SerialIterator(train, args.batchsize)
    test_iter = chainer.iterators.SerialIterator(test, args.batchsize,
                                                 repeat=False, shuffle=False)

    sum_accuracy = 0
    sum_loss = 0

    # [ChainerUI] setup log reporter to show on ChainerUI
    ui_report = LogReport(args.out, conditions=args)
    while train_iter.epoch < args.epoch:
        batch = train_iter.next()
        x_array, t_array = convert.concat_examples(batch, args.gpu)
        x = chainer.Variable(x_array)
        t = chainer.Variable(t_array)
        optimizer.update(model, x, t)
        sum_loss += float(model.loss.data) * len(t.data)
        sum_accuracy += float(model.accuracy.data) * len(t.data)

        if train_iter.is_new_epoch:
            print('epoch: ', train_iter.epoch)
            train_loss = sum_loss / train_count
            train_accuracy = sum_accuracy / train_count
            print('train mean loss: {}, accuracy: {}'.format(
                train_loss, train_accuracy))

            # evaluation
            sum_accuracy = 0
            sum_loss = 0
            for batch in test_iter:
                x_array, t_array = convert.concat_examples(batch, args.gpu)
                x = chainer.Variable(x_array)
                t = chainer.Variable(t_array)
                loss = model(x, t)
                sum_loss += float(loss.data) * len(t.data)
                sum_accuracy += float(model.accuracy.data) * len(t.data)

            test_iter.reset()
            test_loss = sum_loss / test_count
            test_accuracy = sum_accuracy / test_count
            print('test mean  loss: {}, accuracy: {}'.format(
                test_loss, test_accuracy))
            # [ChainerUI] write values to 'log' file
            stats = {
                'epoch': train_iter.epoch,
                'iteration': train_iter.epoch * args.batchsize,
                'train/loss': train_loss, 'train/accuracy': train_accuracy,
                'test/loss': test_loss, 'test/accuracy': test_accuracy
            }
            ui_report(stats)
            sum_accuracy = 0
            sum_loss = 0

    # Save the model and the optimizer
    print('save the model')
    serializers.save_npz('mlp.model', model)
    print('save the optimizer')
    serializers.save_npz('mlp.state', optimizer)


if __name__ == '__main__':
    main()
