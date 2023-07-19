from random import randint, choice as rc, randrange
from models import db, User, Category_Mom, Interest, Friendship, Message

# Remote library imports
from faker import Faker

# Local imports
from app import app

fake = Faker()
if __name__ == '__main__':
    with app.app_context():
        # print("Clearing db...")
        # User.query.delete()
        # Friendship.query.delete()
        # Message.query.delete()
        # Category_Mom.query.delete()
        # Interest.query.delete()
    

        # profile_images = [
        #     "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        #     "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        #     "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        #     "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/7173498/pexels-photo-7173498.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/6849365/pexels-photo-6849365.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/3985233/pexels-photo-3985233.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/4017420/pexels-photo-4017420.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5444934/pexels-photo-5444934.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5853820/pexels-photo-5853820.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/6849581/pexels-photo-6849581.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/1755207/pexels-photo-1755207.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5094674/pexels-photo-5094674.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5907535/pexels-photo-5907535.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/6116274/pexels-photo-6116274.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5528997/pexels-photo-5528997.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5368742/pexels-photo-5368742.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/3933995/pexels-photo-3933995.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/2917339/pexels-photo-2917339.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/5529941/pexels-photo-5529941.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/3845191/pexels-photo-3845191.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/2100864/pexels-photo-2100864.jpeg?auto=compress&cs=tinysrgb&w=400",
        #     "https://images.pexels.com/photos/1157399/pexels-photo-1157399.jpeg?auto=compress&cs=tinysrgb&w=400"
        # ]

        print("Seeding mom options...")
        momlifeoptions = [
            Category_Mom(type="Pregnant"),
            Category_Mom(type="New mom"),
            Category_Mom(type="Have toddlers"),
            Category_Mom(type="Have teenagers"),
            Category_Mom(type="Planning for a family"),
            Category_Mom(type="Empty nester"),
            Category_Mom(type="Adoption journey"),
            Category_Mom(type="Fertility journey"),
            Category_Mom(type="Have School-age children"),
            Category_Mom(type="Have preteens")
        ]
        db.session.add_all(momlifeoptions)
        print(momlifeoptions)

        # #create list of activity for each category
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

        # names = [
        #     "Christi Moreno",
        #     "Erin Morris",
        #     "Sierra Cherniak",
        #     "Heather Kho",
        #     "Annette",
        #     "Nikki Garza",
        #     "Barbara Clay",
        #     "Emiley De La Garza",
        #     "Rachel S.",
        #     "Val",
        #     "Debbie Schmidt",
        #     "Kathy Carroll",
        #     "Christine Wells",
        #     "Michelle Jensen",
        #     "Jenna Pecho",
        #     "Espi Garcia",
        #     "Carly Prachett",
        #     "Anne Martin",
        #     "Michelle F.",
        #     "Olivia O.",
        #     "Sabrina Rancier",
        #     "Justina Rost",
        #     "Colette Schmidt",
        #     "Jeraldine S.",
        #     "Melissa Dew",
        #     "Ashley Frevert",
        #     "Nikki S."
        # ]

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
            "Ottine, TX",
            "Madisonville, TX",
            "Bastrop, TX"
        ]

        # print("Seeding Users...")
        user_profiles = [
           User(name="Christi", profile_image="https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have 3 littles and life is chaotic but I wouldn't have it any other way! We love being outdoors in parks, going to the beach and visiting the trampoline park", category_mom_id=3, location=rc(fake_locations)),
           User(name="Erin M.", profile_image="https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg?auto=compress&cs=tinysrgb&w=400", about="Mama of twins! I love a nice red wine. #WineMom ", category_mom_id=9, location=rc(fake_locations)),
           User(name="Sierra C.", profile_image="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", about="I travel the world for a living. Love hiking and camping. #fitlife #yoga #running", category_mom_id=7, location=rc(fake_locations)),
           User(name="Heather K.", profile_image="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", about="I'm a 'Jane of all trades', love dogs and the outdoors", category_mom_id=5, location=rc(fake_locations)),
           User(name="Annette", profile_image="https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have 3 grown children and 1 grandchild. Love a good beer, good food and I'm always up for daytrip somewhere new!", category_mom_id=6, location=rc(fake_locations)),
           User(name="Nikki Garza", profile_image="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have one beautiful daughter, love going out for drinks and enjoy a nice chat with other mamas", category_mom_id=9, location=rc(fake_locations)),
           User(name="Elise Harper", profile_image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", about="I love my three dogs and enjoy a good TV series. I very independent and march to the beat of my own drum. I enjoy reading, hiking and casual gaming.", category_mom_id=5, location=rc(fake_locations)),
           User(name="Barbara Clay", profile_image="https://images.pexels.com/photos/7173498/pexels-photo-7173498.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have one energetic toddler. We love visiting the park and would love to find another toddler-mom my son and I can hand out with.", category_mom_id=3, location=rc(fake_locations)),
           User(name="Colette Schmidt", profile_image="https://images.pexels.com/photos/6849365/pexels-photo-6849365.jpeg?auto=compress&cs=tinysrgb&w=400", about="I'm a gentle soul and love kids", category_mom_id=5, location=rc(fake_locations)),
           User(name="Jeraldine S.", profile_image="https://images.pexels.com/photos/6849365/pexels-photo-6849365.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have 3 grown children and 1 grandchild. Spend the weekends riding my Harley. Love music and enjoying drinks with friends and family", category_mom_id=6, location=rc(fake_locations)),
           User(name="Rachel S.", profile_image="https://images.pexels.com/photos/3985233/pexels-photo-3985233.jpeg?auto=compress&cs=tinysrgb&w=400", about="I love art and art history. I love visiting museums and a well-crafted cocktail", category_mom_id=8, location=rc(fake_locations)),
           User(name="Val", profile_image="https://images.pexels.com/photos/4017420/pexels-photo-4017420.jpeg?auto=compress&cs=tinysrgb&w=400", about="Avid hiker and well-traveled. Ready to welcome our new bundle of joy", category_mom_id=1, location=rc(fake_locations)),
           User(name="Debbie Schmidt", profile_image="https://images.pexels.com/photos/5444934/pexels-photo-5444934.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have grown children and love spending time with all of my grandchildren. I love traveling with my husband and live music", category_mom_id=6, location=rc(fake_locations)),
           User(name="Kathy Carroll", profile_image="https://images.pexels.com/photos/5853820/pexels-photo-5853820.jpeg?auto=compress&cs=tinysrgb&w=400", about="Have one teen and we love traveling. Currently focused on home-improvement projects.", category_mom_id=6, location=rc(fake_locations)),
           User(name="Christine Wells", profile_image="https://images.pexels.com/photos/6849581/pexels-photo-6849581.jpeg?auto=compress&cs=tinysrgb&w=400", about="New mom to a beautiful daughter. I love staying in, playing board games and snuggles with my little one", category_mom_id=2, location=rc(fake_locations)),
           User(name="Michelle Jensen", profile_image="https://images.pexels.com/photos/1755207/pexels-photo-1755207.jpeg?auto=compress&cs=tinysrgb&w=400", about="I have a twin boy and girl and I'm a huge foodie! I love hosting parties and crafting my own cocktails", category_mom_id=9, location=rc(fake_locations)),
           User(name="Jenna Pecho", profile_image="https://images.pexels.com/photos/5094674/pexels-photo-5094674.jpeg?auto=compress&cs=tinysrgb&w=400", about="Enjoying the changes this new life has brought me. Love live music, music festivals and movies", category_mom_id=2, location=rc(fake_locations)),
           User(name="Espi Garcia", profile_image="https://images.pexels.com/photos/5907535/pexels-photo-5907535.jpeg?auto=compress&cs=tinysrgb&w=400", about="Mama to 3 amazing kids! I love trips to the beach and I'm a big fan of a bold lip color", location=rc(fake_locations)),
           User(name="Carly Prachett", profile_image="https://images.pexels.com/photos/6116274/pexels-photo-6116274.jpeg?auto=compress&cs=tinysrgb&w=400", about="Mom to one son. On a fitness journey. I love being active and having a good time", location=rc(fake_locations)),
           User(name="Olivia O.", profile_image="https://images.pexels.com/photos/3933995/pexels-photo-3933995.jpeg?auto=compress&cs=tinysrgb&w=400", about="Recently married and planning for our next chapter in life. I'm a bubbly, people-person", category_mom_id=5, location=rc(fake_locations)),
           User(name="Sabrina Rancier",profile_image="https://images.pexels.com/photos/3933995/pexels-photo-3933995.jpeg?auto=compress&cs=tinysrgb&w=400", about="Soon to be married and blessed to have a beautiful daughter. We love crafting, going to the movies and beach days.", category_mom_id=3, location=rc(fake_locations)),
           User(name="Justina Rost",profile_image="https://images.pexels.com/photos/2917339/pexels-photo-2917339.jpeg?auto=compress&cs=tinysrgb&w=400", about="Married to the love of my life and ready to welcome our new little one. I love fishing, hiking and travel", category_mom_id=1, location=rc(fake_locations)),
           User(name="Melissa Dew",profile_image="https://images.pexels.com/photos/5529941/pexels-photo-5529941.jpeg?auto=compress&cs=tinysrgb&w=400", about="Boy mom to 3 amazing boys. Love lake days and good margarita", category_mom_id=9, location=rc(fake_locations)),
           User(name="Ashley Frevert", profile_image="https://images.pexels.com/photos/3845191/pexels-photo-3845191.jpeg?auto=compress&cs=tinysrgb&w=400", about="Active mom to 3 kids. Love fitness and going to concerts. Huge Switfie!", category_mom_id=10, location=rc(fake_locations))
        ]

       

        # for _ in user_profiles:
        #     interest=randrange(1, 15)
        #     user = User(
        #         username="mama".join(str(randrange(1,27))),
        #         _password_hash="cimfppp",
        #         email=fake.unique.email(),
        #         phone_number=fake.phone_number(),
        #         dob=fake.date(),
        #         # gender=rc(genders)
        #         location=rc(fake_locations),
        #         interest_id=interest
        #         )
        #     user_profiles.append(user)

        db.session.add_all(user_profiles)

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
                    requesting_user_id=randrange(1,23),
                    receiving_user_id=28,
                    status=rc(statuses))
            cb_friendships.append(new_friend)


        db.session.add_all(cb_friendships)
        db.session.commit()
        

    print("Done Seeding!")

            
    # Users = [
    #     User(name=fake.name(), username=fake.unique.username(), password=fake.password(), email=fake.email(), phone_number=fake.phone)
    # ]