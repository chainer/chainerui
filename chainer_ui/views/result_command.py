""" results.py """

from flask import jsonify, request
from flask.views import MethodView

from chainer_ui import DB_SESSION
from chainer_ui.models.result import Result
from chainer_ui.utils.command_item import CommandItem
# from chainer_ui.tasks import crawl_results


class ResultCommandAPI(MethodView):
    """ ResultCommandAPI """

    def post(self, result_id, project_id):
        ''' POST /api/v1/results/<int:id>/commands '''

        result = DB_SESSION.query(Result).filter_by(id=result_id).first()

        if result is None:
            return jsonify({
                'result': None,
                'message': 'No interface defined for URL.'
            }), 404

        request_json = request.get_json()
        if request_json is None:
            return jsonify({
                'message': 'Empty request.'
            }), 400

        command_name = request_json.get('name', None)
        if command_name is None:
            return jsonify({
                'message': 'Name is required.'
            }), 400

        schedule = request_json.get('schedule', None)
        if not CommandItem.is_valid_schedule(schedule):
            return jsonify({
                'message': 'Schedule is invalid.'
            }), 400

        command = CommandItem(
            name=command_name,
        )

        command.set_request(
            CommandItem.REQUEST_OPEN,
            request_json.get('body', None),
            request_json.get('schedule', None)
        )

        commands = CommandItem.load_commands(result.path_name)
        commands.append(command)

        CommandItem.dump_commands(commands, result.path_name)

        # crawl_results()

        new_result = DB_SESSION.query(Result).filter_by(id=result_id).first()
        new_result_dict = new_result.serialize

        return jsonify({'commands': new_result_dict['commands']})
