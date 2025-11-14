# ALOT

## project description
**Adults Leisure Outdoor and Technical Indoor Activities Group **

We aim to collect FREE occupations, if your sessions are paid and held on a weekly basis, the price that can be charged by advertising here is maximum £20 monthly and £5 per occasion, per person. Please note that the aim of this site is to provide a relaxed, calm environment, a safe place for adults aged 21 and above and not suitable for children. Our aim is to find adults who normally are busy weekdays in office hours, or otherwise have a weekly occupation, and have a couple of hours only weekly and a very limited budget to attend to such classes. We'd like to  build small local communities of like-minded people aroud certain activities. As well as bring in local venues "in the middle of nowhere" where people usually feel, there is nothing to do in their neighbourhood. We try to find venues for tutors, or tutors for venues, or more members to existing sessions, and the aim is not to make profit to anyone. We don't think it is fair to charge a larger fee for people, they might not find the event to their taste and not attend anymore, however if we can keep the fees low, the sessions can occur regularly, thereby building a trust, a regularity, reliability and really a safe harbour to the people that is always there, no matter if they have to skip 2-3-5-10 occasions, they know that the event is regular and keep running no matter what. Or at least any unexpected changes in the plans will be broadcasted to all subscribers. Our biggest goal would be if we could find overlapping in the communities/activities, the word of mouth spreading the joy and fun these clubs mean, and thereby show how wonderfully diverse and able people are if they get the chance. Thank you for your interest and cooperation. 

### User type: organisers
Please fill in the below details. Don't share any personal info in the contents, mobile number, email, on audiovisual content faces, brand logos, any other PII. Those applications will be removed. Please provide your email address where we can contact you. We will require written testimonial from three participants, with name and email, who already attend to the sessions. Those who share their details that way agree, that we'll contact them for a discussion about their personal experiences which we might record in case of any legal disputes.
* first part of the postcode of the location of the activity - public
* indoor or outdoor
* main category of occupation (crafting, music, walks, cooking/bakery, gardening)
* subcategory
* details (textbox) 
* link to youtube/vimeo/other video content introducing the activity
* day and time of the week where people can attend
* duration of the activity and if flexible or strict finish (can people leave before end)
* suitable for people living with disabilities, please specify (textbox)
* dog friendly activity 
* Organiser's email address - non public
* Do you have a venue, this venue is already hosting this event? Please fill in venue section (below)

### User type: attendants
Please fill in the below details. Don't share any personal info in the contents, mobile number, email, on audiovisual content faces, brand logos, any other PII. Those applications will be removed. Please provide your email address where we can contact you.
What sort of occupation are you willing to participate in?
* main category of occupation (crafting, music, walks, cooking/bakery, gardening) (dropdown) or other, please specify ("add new" button)
* subcategory (dropdown) or other, please specify ("add new" button)
* indoor, outdoor or both
* please list out some areas, first part of the postcode, where you can attend to sessions. Add multiple ("add new" button)
* do you drive?
* do you need a lift?
* should we show activities that can be attended to by disabled people
* do you live with any disabilities they should know of?
* please specify some times of the week that you feel you could attend to such sessions. Eg. Wednesdays from 6pm, Fridays from 6pm, Sunday mornings, ("add new" button)
* is there anything else you'd like to add?
* dog friendly activities only? Checkbox
* Contact email and nick name/addressee name

If filling this form causes you trouble, please write us what sort of activities have you been thinking of, and how could you manage to participate. Eg. "Hi, I've always been a music fan, and I have great hand crafting skills. I'd like to learn how to make traditional or modern musical instruments, but I couldn't find the time or money to attend to luthier education. I am usually free Fridays from 5:30 pm close to my workplace or preferably my home. I don't drive, I can access A and B places by bus or C area by train. But I'd love to make friends, who live close to me and can give me a lift. Or walking distance would be the best. I also like hiking, I could do that Sunday mornings, gardening maybe, or evenings an hour of hand crafting somewhere closeby. I have lost two fingers, but that doesn't make a problem in handling tools usually."

### User type: venues
Please fill in the below details. Don't share any personal info in the contents, mobile number, email, on audiovisual content faces, brand logos, any other PII. Those applications will be removed. Please provide your email address where we can contact you.
* first part of postcode - public
* What days of the week do you have free capacity?
* What duration can you provide on those days
* please select the categories you welcome in your venue
* subcategories
* parking conditions
* bus/train accessibility
* disabled accessibility please detail
* toilets provided
* any tool or furniture provided please list
* link to youtube/vimeo/other video content introducing the venue
* contact name and contact email of the responsible person (if not the same as organiser)

### User type: individuals who hold sessions as sole trader/tutor/instructor
Please fill in the below details. Don't share any personal info in the contents, mobile number, email, on audiovisual content faces, brand logos, any other PII. Those applications will be removed. Please provide your email address where we can contact you. We will require written testimonial from three participants, with name and email, who already attend to the sessions. Those who share their details that way agree, that we'll contact them for a discussion about their personal experiences which we might record in case of any legal disputes.
* first part of the postcode of the location of the activity - public
* indoor or outdoor
* main category of occupation (crafting, music, walks, cooking/bakery,  yoga, meditation, discussion group, dance, amateur music, drumming, etc)
* subcategory
* details (textbox) 
* link to youtube/vimeo/other video content introducing the instructor
* day and time of the week where people can attend
* duration of the activity and if flexible or strict finish (can people leave before end)
* suitable for people living with disabilities, please specify (textbox)
* dog friendly activity 
* Organiser's email address - non public
* Do you have a venue, this venue is already hosting this event? Please fill in venue section (below)
* please add your certificate if any

If you don't find, please describe your activity here introducing yourself, why, where, how, when you do these sessions, who do you think would be happy to join, what benefits can you offer to these people attending weekly. Eg. "I am a yoga instructor, and health advisor by trainig with so and so experience and certifications. I just moved into the (first part of postcode) area. Currently looking for a venue. Could do Thursday afternoons 50 min sessions with 10 min breaks between 4-9pm. I'd love to be contacted by venues who would provide space and find attendants nearby to build our yoga and lifestyle group. "

## stack
Laravel,
Vue 3 / vite

## authentication
 - user enters email address (frontend: get login code)
 - user login:
 - user receives a code and an url that they can enter the code (frontend: enter code)
 - we hash email and compare hash to our database, if user exists, load their data (avoid storing PII)
 
## user levels
user saved:
- can post ad, 
- browse ads, 
- set if their ad is for logged in users only

user not saved:
- can see advertisements that users marked as "public"

## navigation/routing structure
later

## component hierarchy
later

## mock data values
One can extract some of the data from the above descriptions.

