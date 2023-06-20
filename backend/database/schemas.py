from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Task, Reward, UserActivity

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email",)

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class TaskSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    task_type = fields.String(required=True)
    description = fields.String(required=True)
    entry_time = fields.DateTime()
    start_time = fields.DateTime()
    completion_time = fields.DateTime()
    deadline = fields.DateTime()
    status = fields.String()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)

    class Meta:
        fields = ("id", "name", "task_type", "description", "entry_time", "start_time", "completion_time", "deadline", "status", "user_id", "user")

    @post_load
    def create_task(self, data, **kwargs):
        return Task(**data)

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

class UserActivitySchema(ma.SQLAlchemyAutoSchema):
    id = fields.Integer(primary_key=True)
    activity_type = fields.String(required=True)
    task_type = fields.String(required=True)  
    timestamp = fields.DateTime()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)

    class Meta:
        fields = ("id", "activity_type", "task_type", "timestamp", "user_id", "user")

    @post_load
    def create_user_activity(self, data, **kwargs):
        return UserActivity(**data)

user_activity_schema = UserActivitySchema()
user_activities_schema = UserActivitySchema(many=True)


class RewardSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "name", "user_id", "user")

    @post_load
    def create_reward(self, data, **kwargs):
        return Reward(**data)

reward_schema = RewardSchema()
rewards_schema = RewardSchema(many=True)


