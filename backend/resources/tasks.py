from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from database.models import db, Task, UserActivity
from database.schemas import task_schema, tasks_schema
from datetime import datetime

class UserTaskResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_tasks = Task.query.filter_by(user_id=user_id).all()
        return tasks_schema.dump(user_tasks), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_task = task_schema.load(form_data)
        new_task.user_id = user_id
        new_task.entry_time = datetime.utcnow()
        db.session.add(new_task)
        new_task.log_activity("TASK_CREATED")
        db.session.commit()
        return task_schema.dump(new_task), 201
    
class UserTaskSpecificResource(Resource):
    @jwt_required()
    def delete(self, task_id):
        user_id = get_jwt_identity()
        task_to_delete = Task.query.filter_by(id=task_id, user_id=user_id).first()
        if task_to_delete is None:
            return {"message": "No task found with given id for the current user."}, 404

        db.session.delete(task_to_delete)
        db.session.commit()

        return {"message": "Task successfully deleted."}, 200
    
    @jwt_required()
    def put(self, task_id):
        user_id = get_jwt_identity()
        task_to_edit = Task.query.filter_by(id=task_id, user_id=user_id).first()

        if task_to_edit is None:
            return {"message": "No task found with given id for the current user."}, 404

        form_data = request.get_json()
        for key, value in form_data.items():
            setattr(task_to_edit, key, value)

        db.session.commit()
        
        return task_schema.dump(task_to_edit), 200
    
    @jwt_required()
    def patch(self, task_id):
        user_id = get_jwt_identity()
        task_to_update = Task.query.filter_by(id=task_id, user_id=user_id).first()

        if task_to_update is None:
            return {"message": "No task found with given id for the current user."}, 404

        form_data = request.get_json()
        action = form_data.get('action')

        if action == 'start':
            task_to_update.status = 'In Progress'
            task_to_update.start_time = datetime.now()
            task_to_update.log_activity("TASK_STARTED")
        elif action == 'finish':
            task_to_update.status = 'Completed'
            task_to_update.completion_time = datetime.now()
            task_to_update.log_activity("TASK_FINISHED")
        else:
            return {"message": "Invalid action."}, 400

        db.session.commit()

        return task_schema.dump(task_to_update), 200
