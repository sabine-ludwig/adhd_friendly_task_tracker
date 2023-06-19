from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from database.models import db, UserActivity, check_password_hash
from database.schemas import user_activity_schema, user_activities_schema
from datetime import datetime

class UserTaskTrendsResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        task_time_trends = UserActivity.calculate_task_time_trends(user_id)
        return user_activities_schema.dump(task_time_trends), 200
