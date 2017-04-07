module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'Grab a Book Already! - Snippet',
        content:`I have a confession to make, I have not always been a bookworm.
                 I know a good number of people who will have a hard time believing
                 that. I loved to read as a child and downed any novel, often borrowed,
                 that came my way easily. This wore off early in my teenage years
                 when pressure to do well in school increased and I, like many, began
                 to see reading anything besides school text as a waste of time.
                 I got so lazy that I did not read most of my set books to completion,
                 I used guides to read the summary and I passed my languages exam
                 by sheer luck, cramming and reverse engineering. I had lost the
                 one thing that allowed me to escape reality as a child and I was devastated.

                 I was soon in college and I am not proud when I say that I only
                 stepped in the library twice in three years: orientation day and
                 clearance day. I still don’t understand the indexing at my Alma Mater’s
                 Library. I know my lawyer friends want to swallow me right now. Again,
                 I figured how to beat the system, did the bare minimum and walked out
                 with a decent enough degree – I call this reverse engineering.
                 (If future employers, clients or school selection committees ever
                 read this, I have learnt a costly lesson since, really. 🙂 ) This is a
                 familiar story for a lot of Kenyans today. We grow up, get into a crazy
                 system, find our spot, fit in and do all we can to survive and come
                 out on the other side.`,
        access: 'public',
        userId: 1,
        userRoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Secret Agent',
        content: 'Undercover content. Scratch to reveal. :p',
        access: 'private',
        userId: 2,
        userRoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Boy and His Banana. - Snippet',
        content: `I was in a matatu headed home a couple of weeks ago. I sat next
                 to a lady with her son. On our way, they started eating sweet bananas
                 and as we all know, sweet bananas, as any other type of bananas,
                 come with peels.

                 I was conveniently seated next to the window so the little boy,
                 who couldn’t have been more than four years old, instinctively
                 handed me his peel. I supposed he wanted me to throw it out through
                 the window but I held on to the poor banana peel.

                 For the second peel, his mom literally went over my bag pack,
                 opened the window herself and threw out the peel. For peel number
                 three, the same happened only that this time she brought her son’s
                 tiny little hand closer and closer to the window until it was outside
                 enough for him to release the peel to its afterlife. This continued
                 for the entire bunch.

                 Feeling albeit guilty that peel number one was separated from the
                 rest of his siblings, I held on all the way home where I disposed it of.`,
        access: 'public',
        userId: 3,
        userRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Another One, Another One!',
        content: 'Yo! Another private document!',
        access: 'private',
        userId: 4,
        userRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Do not Miss the Bus. - Snippet',
        content: `Something very interesting happened today. I was to head to Thika
                 after Church so as soon as Service was done I dashed out, headed
                 to town and made my way to the Thika stage.

                 There was a matatu waiting to fill. The usual loud ones playing
                 the same dj mix every time. There was folk peeping at the door
                 trying to decide whether to get in or I don’t know, sing? Dance?
                 I was in a hurry, it’s an irritating habit for anyone in a hurry.
                 I squeezed my way through and made for the back seat, one of those
                 with a woofer under them.

                 I got my fare, buckled up, sat back and waited for the matatu to
                 fill. With only three seats left I assumed we’d be out in 5 minutes.
                 10 minutes later, no one else had got in, mind you, the crowd at the
                 door peeping in was getting larger. I suppose it’s because two of the
                 empty seats were at the back and the third one couldn’t be taken till
                 the two got filled.

                 Another ten minutes, someone had got in then got out. Two others
                 came and took the seats at the back. Another came, sat at the seat
                 next to the door and two seconds later got out and stood AT THE DOOR!
                 O_o As all this took place someone took our fare (I assumed he was not
                 the driver since he was kite high). Eventually the remaining seat got
                 occupied and we were good to go. And yes the high dude ended up being
                 the driver. O_o His driving was alright though.`,
        access: 'public',
        userId: 5,
        userRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ever heard of Nyumbani',
        content: 'It is similar to Maskani',
        access: 'public',
        userId: 4,
        userRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
