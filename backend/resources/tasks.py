from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Task, check_password_hash
from database.schemas import task_schema, tasks_schema

class UserTaskResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_tasks = Task.query.filter_by(user_id=user_id)
        return tasks_schema.dump(user_tasks), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_task = task_schema.load(form_data)
        new_task.user_id = user_id
        db.session.add(new_task)
        db.session.commit()
        return task_schema.dump(new_task), 201
    
# class GetTaskInformation(Resource):
#     @jwt_required()
#     def get(self, task_id):
#         user_id = get_jwt_identity()
#         task_info = Task.query.filter_by(task_id=task_id).all()

