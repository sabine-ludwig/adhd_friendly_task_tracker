from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    task_type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    entry_time = db.Column(db.DateTime) 
    start_time = db.Column(db.DateTime)
    completion_time = db.Column(db.DateTime)
    deadline = db.Column(db.DateTime)
    status = db.Column(db.String(255), default="Not Yet Started")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

    def log_activity(self, activity_type):
        activity = UserActivity(
            activity_type=activity_type,
            task_type=self.task_type,
            user_id=self.user_id
        )
        db.session.add(activity)
        db.session.commit()

class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    activity_type = db.Column(db.String(255), nullable=False)
    task_type = db.Column(db.String(255))  
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

    @classmethod
    def calculate_task_time_trends(cls, user_id):
        activity_data = (
            cls.query.filter_by(user_id=user_id)
            .order_by(cls.timestamp)
            .all()
        )

        task_times = {}
        for activity in activity_data:
            if activity.task_type not in task_times:
                task_times[activity.task_type] = {
                    'add_to_start': [],
                    'start_to_finish': [],
                }

            if activity.activity_type == 'TASK_CREATED':
                task_times[activity.task_type]['add_time'] = activity.timestamp
            elif activity.activity_type == 'TASK_STARTED':
                add_to_start_time = activity.timestamp - task_times[activity.task_type]['add_time']
                task_times[activity.task_type]['add_to_start'].append(add_to_start_time)
            elif activity.activity_type == 'TASK_FINISHED':
                start_to_finish_time = activity.timestamp - task_times[activity.task_type]['start_time']
                task_times[activity.task_type]['start_to_finish'].append(start_to_finish_time)

        for task_type, times in task_times.items():
            add_to_start_avg = sum(times['add_to_start'], timedelta()) / len(times['add_to_start'])
            start_to_finish_avg = sum(times['start_to_finish'], timedelta()) / len(times['start_to_finish'])
            task_times[task_type] = {
                'add_to_start': add_to_start_avg,
                'start_to_finish': start_to_finish_avg,
            }

        return task_times

class Reward(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

