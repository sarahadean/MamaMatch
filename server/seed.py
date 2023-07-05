from random import randint, choice as rc, randrange
from models import db, User, MomCategory, Interest

# Remote library imports
from faker import Faker

# Local imports
from app import app

fake = Faker()

print("Seeding Users...")
user_profiles = []
def create_users(x):
    for i in range(0, x):
        user_profiles.append(User(
        name=fake.name(),
        username=fake.username(),
        password=fake.password(),
        email=fake.unique.email(),
        phone_number=fake.phone(),
        dob=fake.date(),
        # gender=rc(genders)
        profile_image=fake.image(),
        location=fake.city(),
        about=fake.sentence(10),
        mom_life=rc(momlifeoptions),
        interests=rc(interests_list),
        ))

print("Seeding mom options...")
momlifeoptions = [
    MomCategory(type="Pregnant"),
    MomCategory(type="New mom"),
    MomCategory(type="Have toddlers"),
    MomCategory(type="Have teenagers"),
    MomCategory(type="Planning for a family"),
    MomCategory(type="Empty nester"),
    MomCategory(type="Adoption journey"),
    MomCategory(type="Fertility journey")
]

db.session.add(momlifeoptions)

print("Seeding interests list...")
interests_list = [
    Interest(activity="Fitness"),
    Interest(activity="Foodie"),
    Interest(activity="Sports"),
    Interest(activity="Outdoors"),
    Interest(activity="Traveling"),
    Interest(activity="Faith"),
    Interest(activity="Movies"),
    Interest(activity="TV"),
    Interest(activity="Music"),
    Interest(activity="Dogs"),
    Interest(activity="Cats"),
    Interest(activity="Concerts"),
    Interest(activity="Going out"),
    Interest(activity="Staying in")
]
db.session.add_all(interests_list)
db.session.add_all(user_profiles)
db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        user_profiles(20)
    
    print("Done Seeding!")

            
            
    # Users = [
    #     User(name=fake.name(), username=fake.unique.username(), password=fake.password(), email=fake.email(), phone_number=fake.phone)
    # ]