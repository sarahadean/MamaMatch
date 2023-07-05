from random import randint, choice as rc, randrange
from models import db, User, Category_Mom, Interest

# Remote library imports
from faker import Faker

# Local imports
from app import app

fake = Faker()
if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
    
        profile_images = [
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=400"
        ]

        print("Seeding mom options...")
        momlifeoptions = [
            Category_Mom(type="Pregnant"),
            Category_Mom(type="New mom"),
            Category_Mom(type="Have toddlers"),
            Category_Mom(type="Have teenagers"),
            Category_Mom(type="Planning for a family"),
            Category_Mom(type="Empty nester"),
            Category_Mom(type="Adoption journey"),
            Category_Mom(type="Fertility journey")
        ]
        db.session.add_all(momlifeoptions)
        # print(momlifeoptions)

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

        print("Seeding Users...")
        user_profiles = []
        for i in range(20):
            user = User(
                name=fake.name(),
                username=fake.text(8),
                password=fake.password(),
                email=fake.unique.email(),
                phone_number=fake.phone_number(),
                dob=fake.date(),
                # gender=rc(genders)
                profile_image=rc(profile_images),
                location=fake.city(),
                about=fake.sentence(10),
                # mom_life=rc(momlifeoptions),
                # interests=rc(interests_list),
                )
            user_profiles.append(user)
            db.session.add_all(user_profiles)

        db.session.commit()
        


        
        

        

        

       


    
    print("Done Seeding!")

            
            
    # Users = [
    #     User(name=fake.name(), username=fake.unique.username(), password=fake.password(), email=fake.email(), phone_number=fake.phone)
    # ]