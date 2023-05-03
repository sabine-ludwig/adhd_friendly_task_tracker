from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Reward, check_password_hash
from database.schemas import reward_schema, rewards_schema

class UserRewardResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_rewards = Reward.query.filter_by(user_id=user_id)
        return rewards_schema.dump(user_rewards), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_reward = reward_schema.load(form_data)
        new_reward.user_id = user_id
        db.session.add(new_reward)
        db.session.commit()
        return reward_schema.dump(new_reward), 201
