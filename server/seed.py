from random import randint, choice as rc, randrange
from models import db, User, Category_Mom, Interest, Friendship, Message

# Remote library imports
from faker import Faker

# Local imports
from app import app

fake = Faker()
if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        # User.query.delete()
        # Friendship.query.delete()
        # Message.query.delete()
        # Category_Mom.query.delete()
        # Interest.query.delete()
    

        profile_images = [
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/7173498/pexels-photo-7173498.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/6849365/pexels-photo-6849365.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/3985233/pexels-photo-3985233.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/4017420/pexels-photo-4017420.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5444934/pexels-photo-5444934.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5853820/pexels-photo-5853820.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/6849581/pexels-photo-6849581.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1755207/pexels-photo-1755207.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5094674/pexels-photo-5094674.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5907535/pexels-photo-5907535.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/6116274/pexels-photo-6116274.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5528997/pexels-photo-5528997.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5368742/pexels-photo-5368742.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/3933995/pexels-photo-3933995.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/2917339/pexels-photo-2917339.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/5529941/pexels-photo-5529941.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/3845191/pexels-photo-3845191.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/2100864/pexels-photo-2100864.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1157399/pexels-photo-1157399.jpeg?auto=compress&cs=tinysrgb&w=400"
        ]

        # print("Seeding mom options...")
        # momlifeoptions = [
        #     Category_Mom(type="Pregnant"),
        #     Category_Mom(type="New mom"),
        #     Category_Mom(type="Have toddlers"),
        #     Category_Mom(type="Have teenagers"),
        #     Category_Mom(type="Planning for a family"),
        #     Category_Mom(type="Empty nester"),
        #     Category_Mom(type="Adoption journey"),
        #     Category_Mom(type="Fertility journey")
        # ]
        # db.session.add_all(momlifeoptions)
        # print(momlifeoptions)

        # #create list of activity for each category
        # print("Seeding interests list...")
        # interests_list = [
        #     Interest(activity="Fitness"),
        #     Interest(activity="Foodie"),
        #     Interest(activity="Sports"),
        #     Interest(activity="Outdoors"),
        #     Interest(activity="Traveling"),
        #     Interest(activity="Faith"),
        #     Interest(activity="Movies"),
        #     Interest(activity="TV"),
        #     Interest(activity="Music"),
        #     Interest(activity="Dogs"),
        #     Interest(activity="Cats"),
        #     Interest(activity="Concerts"),
        #     Interest(activity="Going out"),
        #     Interest(activity="Staying in")
        # ]
        # db.session.add_all(interests_list)
        names = [
            "Christi Moreno",
            "Erin Morris",
            "Sierra Cherniak",
            "Heather Kho",
            "Annette",
            "Nikki Garza",
            "Barbara Clay",
            "Emiley De La Garza",
            "Rachel S.",
            "Val",
            "Debbie Schmidt",
            "Kathy Carroll",
            "Christine Wells",
            "Michelle Jensen",
            "Jenna Pecho",
            "Espi Garcia",
            "Carly Prachett",
            "Anne Martin",
            "Michelle F.",
            "Olivia O.",
            "Sabrina Rancier",
            "Justina Rost",
            "Colette Schmidt",
            "Jeraldine S.",
            "Melissa Dew",
            "Ashley Frevert",
            "Nikki S."
        ]

        fake_locations = [
            "San Antonio, TX",
            "Boerne, TX",
            "Spring, TX",
            "Katy, TX",
            "Fort Worth, TX",
            "Kyle, TX",
            "Spring Branch, TX",
            "New Braunfels, TX",
            "Temple, TX",
            "Ottine, TX"
            "Madisonville, TX",
            "Bastrop, TX"
        ]

        # print("Seeding Users...")
        # user_profiles = []
        # for i in range(1,27):
        #     category=randrange(1, 9)
        #     interest=randrange(1, 15)
        #     for n in names:
        #         n_name=n
        #     user = User(
        #         name=n_name,
        #         username="mama".join(str(randrange(1,27))),
        #         _password_hash="cimfppp",
        #         email=fake.unique.email(),
        #         phone_number=fake.phone_number(),
        #         dob=fake.date(),
        #         # gender=rc(genders)
        #         profile_image=rc(profile_images),
        #         location=rc(fake_locations),
        #         about=fake.sentence(10),
        #         category_mom_id=category,
        #         interest_id=interest
        #         )
        #     user_profiles.append(user)
        # db.session.add_all(user_profiles)

        # fs1 = Friendship(receiving_user_id=1, requesting_user_id=2)
        # db.session.add(fs1)
        # Message.query.delete()
        # fake_messages = []
        # for i in range(300):
        #     friendship=randint(1,51)
        #     random_sentence_length = randint(1,10)
        #     new_message = Message(content=fake.sentence(random_sentence_length), friendship_id=friendship)
        #     fake_messages.append(new_message) 
        #     db.session.add_all(fake_messages)

        Friendship.query.delete()
        statuses = ['PENDING', 'CONFIRMED']
        # friends = []
        # for i in range(50):
        #     user = randrange(1, 51)
        #     recipient = randrange(1, 51)
        #     message=randint(1,301)
        #     if user == recipient:
        #         recipient = randrange(1, 51)
        #     else:
        #         new_friendship = Friendship(
        #             requesting_user_id=user,
        #             receiving_user_id=recipient,
        #             status=rc(statuses),
        #         )

        #         friends.append(new_friendship)
        
        # db.session.add_all(friends)

        cb_friendships = []
        for i in range(1,10):
            new_friend = Friendship(
                    requesting_user_id=randrange(1,27),
                    receiving_user_id=28,
                    status=rc(statuses))
            cb_friendships.append(new_friend)


        db.session.add_all(cb_friendships)
        db.session.commit()
        

    print("Done Seeding!")

            
    # Users = [
    #     User(name=fake.name(), username=fake.unique.username(), password=fake.password(), email=fake.email(), phone_number=fake.phone)
    # ]