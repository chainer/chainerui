import chainer

import chainerui.client.client as chainerui_client


class ModelMonitor(chainer.LinkHook):

    def __init__(self, *args, values=None, **kwargs):
        super(ModelMonitor, self).__init__(*args, **kwargs)
        self.values = {}
        if isinstance(values, list):
            for v in values:
                self.values[v] = None
        else:
            self.values.update(values)
        self.client = None
        self.cached_logs = []
        self.iteration = 0

    def added(self, link):
        client = chainerui_client._client
        if client is None:
            raise ValueError('plase call `chainerui.init()` as first')
        self.client = client

    def forward_postprocess(self, args):
        train_mode = chainer.config.train
        prefix = 'train' if train_mode else 'validation'
        log = {}
        for k, fn in self.values.items():
            key_name = '{}/{}'.format(prefix, k)
            if fn is None:
                if hasattr(args.link, k):
                    v = getattr(args.link, k)
                    if isinstance(v, chainer.Variable):
                        v = v.data
                    log[key_name] = float(v)
            else:
                log[key_name] = fn(args.link)
        log['iteration'] = self.iteration
        self.cached_logs.append(log)
        updated_idx = self.client.post_log(self.cached_logs)
        if updated_idx >= 0:
            self.cached_logs = []
        if train_mode:
            self.iteration += 1


def monitor(model, values=None):
    if values is None:
        values = ['loss', 'accuracy']
    hook = ModelMonitor(values=values)
    model.add_hook(hook)
