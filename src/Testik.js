import React, { useState, useEffect } from 'react';

function Testik() {

    const [toDelete, setToDelete] = useState([]);
    const [books, setBooks] = useState([]);

    // TODO Great Courses
    // "("

    const greatCourses = [
        {
          "title": "The Great Ideas of Philosophy, 2nd Edition",
          "author": "Daniel N. Robinson, The Great Courses"
        },
        {
          "title": "Understanding Genetics: DNA, Genes, and Their Real-World Applications",
          "author": "David Sadava, The Great Courses"
        },
        {
          "title": "Psychology of Human Behavior",
          "author": "David W. Martin, The Great Courses"
        },
        {
          "title": "Argumentation: The Study of Effective Reasoning, 2nd Edition",
          "author": "David Zarefsky, The Great Courses"
        },
        {
          "title": "The Iliad of Homer",
          "author": "Elizabeth Vandiver, The Great Courses"
        },
        {
          "title": "Writing Great Fiction: Storytelling Tips and Techniques",
          "author": "James Hynes, The Great Courses"
        },
        {
          "title": "The Art of Debate",
          "author": "Jarrod Atchison, The Great Courses"
        },
        {
          "title": "Cognitive Behavioral Therapy: Techniques for Retraining Your Brain",
          "author": "Jason M. Satterfield, The Great Courses"
        },
        {
          "title": "The Story of Human Language",
          "author": "John McWhorter, The Great Courses"
        },
        {
          "title": "Your Best Brain: The Science of Brain Improvement",
          "author": "John Medina, The Great Courses"
        },
        {
          "title": "How Ideas Spread",
          "author": "Jonah Berger, The Great Courses"
        },
        {
          "title": "Food: A Cultural Culinary History",
          "author": "Ken Albala, The Great Courses"
        },
        {
          "title": "Influence: Mastering Life's Most Powerful Skill",
          "author": "Kenneth G. Brown, The Great Courses"
        },
        {
          "title": "Theories of Human Development",
          "author": "Malcolm W. Watson, The Great Courses"
        },
        {
          "title": "Why You Are Who You Are: Investigations into Human Personality",
          "author": "Mark Leary, The Great Courses"
        },
        {
          "title": "Understanding the Mysteries of Human Behavior",
          "author": "Mark Leary, The Great Courses"
        },
        {
          "title": "Practicing Mindfulness: An Introduction to Meditation",
          "author": "Mark W. Muesse, The Great Courses"
        },
        {
          "title": "Conspiracies & Conspiracy Theories: What We Should and Shouldn't Believe - and Why",
          "author": "Michael Shermer, The Great Courses"
        },
        {
          "title": "Skepticism 101: How to Think like a Scientist",
          "author": "Michael Shermer, The Great Courses"
        },
        {
          "title": "How We Learn",
          "author": "Monisha Pasupathi, The Great Courses"
        },
        {
          "title": "Philosophy of Mind: Brains, Consciousness, and Thinking Machines",
          "author": "Patrick Grim, The Great Courses"
        },
        {
          "title": "Understanding the Dark Side of Human Nature",
          "author": "Professor Daniel Breyer, The Great Courses"
        },
        {
          "title": "Greece and Rome: An Integrated History of the Ancient Mediterranean",
          "author": "Robert Garland, The Great Courses"
        },
        {
          "title": "The Other Side of History: Daily Life in the Ancient World",
          "author": "Robert Garland, The Great Courses"
        },
        {
          "title": "Stress and Your Body",
          "author": "Robert Sapolsky, The Great Courses"
        },
        {
          "title": "Chemistry and Our Universe: How It All Works",
          "author": "Ron B. Davis, The Great Courses"
        },
        {
          "title": "How You Decide: The Science of Human Decision Making",
          "author": "Ryan Hamilton, The Great Courses"
        },
        {
          "title": "Masters of Mindfulness: Transforming Your Mind and Body",
          "author": "Shauna Shapiro, Rick Hanson, Kristine Carlson, Juna Mustad, The Great Courses"
        },
        {
          "title": "Origins of the Human Mind",
          "author": "Stephen P. Hinshaw, The Great Courses"
        },
        {
          "title": "Memory and the Human Lifespan",
          "author": "Steve Joordens, The Great Courses"
        },
        {
          "title": "Medical Myths, Lies, and Half-Truths: What We Think We Know May Be Hurting Us",
          "author": "Steven Novella, The Great Courses"
        },
        {
          "title": "Your Deceptive Mind: A Scientific Guide to Critical Thinking Skills",
          "author": "Steven Novella, The Great Courses"
        },
        {
          "title": "The Aging Brain",
          "author": "Thad A. Polk, The Great Courses"
        },
        {
          "title": "The Addictive Brain",
          "author": "Thad A. Polk, The Great Courses"
        },
        {
          "title": "The Learning Brain",
          "author": "The Great Courses"
        },
        {
          "title": "Brain Myths Exploded: Lessons from Neuroscience",
          "author": "The Great Courses, Indre Viskontas"
        }
      ]




    const booksData = [
        {
          "title": "THINK Psychology, 1/e",
          "author": "Abigail A. Baird",
          "level": 1
        },
        {
          "title": "Psychology For Dummies",
          "author": "Adam Cash",
          "level": 1
        },
        {
          "title": "Children of Time",
          "author": "Adrian Tchaikovsky",
          "level": 1
        },
        {
          "title": "Lessons From Critical Thinkers: Methods for Clear Thinking and Analysis in Everyday Situations from the Greatest Thinkers in History (The Critical Thinker Book 2)",
          "author": "Albert Rutherford",
          "level": 1
        },
        {
          "title": "Island",
          "author": "Aldous Huxley",
          "level": 1
        },
        {
          "title": "The Gulag Archipelago",
          "author": "Aleksandr Solzhenitsyn",
          "level": 1
        },
        {
          "author": "Aleksandr Solzhenitsyn",
          "title": "Cancer Ward",
          "level": 1
        },
        {
          "title": "The First Circle",
          "author": "Alexander Solzhenitsyn",
          "level": 1
        },
        {
          "title": "The Count of Monte Cristo",
          "author": "Alexandre Dumas",
          "level": 1
        },
        {
          "title": "Endurance: Shackleton's Incredible Voyage",
          "author": "Alfred Lansing",
          "level": 1
        },
        {
          "title": "Genes vs Cultures vs Consciousness: A Brief Story of Our Computational Minds",
          "author": "Andres Campero",
          "level": 50
        },
        {
          "title": "Grit: The Power of Passion and Perseverance",
          "author": "Angela Duckworth",
          "level": 50
        },
        {
          "title": "A Clockwork Orange",
          "author": "Anthony Burgess",
          "level": 50
        },
        {
          "author": "Anthony Stevens",
          "title": "Jung: A Very Short Introduction",
          "level": 50
        },
        {
          "author": "Anton Chekhov",
          "title": "Selected Stories of Anton Chekhov",
          "level": 1
        },
        {
          "title": "2001: A Space Odyssey",
          "author": "Arthur C. Clarke",
          "level": 1
        },
        {
          "author": "Audrey Niffenegger",
          "title": "The Time Traveler's Wife",
          "level": 1
        },
        {
          "title": "Psychology of Human Behavior: 3 Manuscripts-Emotional Intelligence, Neuro-Linguistic Programming, Cognitive Behavioral Therapy",
          "author": "Avery Wright",
          "level": 50
        },
        {
          "title": "A Mind For Numbers: How to Excel at Math and Science (Even If You Flunked Algebra)",
          "author": "Barbara Oakley",
          "level": 50
        },
        {
          "title": "Mindshift: Break Through Obstacles to Learning and Discover Your Hidden Potential",
          "author": "Barbara Oakley PhD",
          "level": 50
        },
        {
          "title": "How We Learn: The Surprising Truth About When, Where, and Why It Happens",
          "author": "Benedict Carey",
          "level": 50
        },
        {
          "author": "Betty Smith",
          "title": "A Tree Grows in Brooklyn",
          "level": 50
        },
        {
          "title": "A Short History of Nearly Everything",
          "author": "Bill Bryson",
          "level": 50
        },
        {
          "author": "Bret Easton Ellis",
          "title": "American Psycho",
          "level": 50
        },
        {
          "title": "Algorithms to Live By: The Computer Science of Human Decisions",
          "author": "Brian Christian, Tom Griffiths",
          "level": 1
        },
        {
          "title": "Deep Work: Rules for Focused Success in a Distracted World",
          "author": "Cal Newport",
          "level": 1
        },
        {
          "title": "Modern Man in Search of a Soul",
          "author": "Carl Gustav Jung",
          "level": 50
        },
        {
          "author": "Carl Jung",
          "title": "Man and His Symbols",
          "level": 1
        },
        {
          "title": "On Becoming a Person: A Therapist's View of Psychotherapy",
          "author": "Carl R. Rogers",
          "level": 50
        },
        {
          "title": "Mindset: The New Psychology of Success",
          "author": "Carol S. Dweck",
          "level": 1
        },
        {
          "title": "Rewire Your Anxious Brain: How to Use the Neuroscience of Fear to End Anxiety, Panic, and Worry",
          "author": "Catherine M. Pittman",
          "level": 1
        },
        {
          "title": "David Copperfield",
          "author": "Charles Dickens",
          "level": 1
        },
        {
          "author": "Charles Duhigg",
          "title": "The Power of Habit: Why We Do What We Do in Life and Business",
          "level": 50
        },
        {
          "author": "Charles Duhigg",
          "title": "Smarter Faster Better: The Secrets of Being Productive in Life and Business",
          "level": 50
        },
        {
          "title": "How to Read a Book (A Touchstone Book)",
          "author": "Charles Van Doren",
          "level": 1
        },
        {
          "title": "Naked Statistics: Stripping the Dread from the Data",
          "author": "Charles Wheelan",
          "level": 50
        },
        {
          "title": "Quantum Computing for Everyone (The MIT Press)",
          "author": "Chris Bernhardt",
          "level": 1
        },
        {
          "title": "Turing's Vision: The Birth of Computer Science",
          "author": "Chris Bernhardt",
          "level": 1
        },
        {
          "title": "Never Split the Difference: Negotiating As If Your Life Depended On It",
          "author": "Chris Voss",
          "level": 50
        },
        {
          "title": "Consciousness: Confessions of a Romantic Reductionist (MIT Press)",
          "author": "Christof Koch",
          "level": 50
        },
        {
          "title": "Ordinary Men: Reserve Police Battalion 101 and the Final Solution in Poland",
          "author": "Christopher R. Browning",
          "level": 50
        },
        {
          "author": "Christopher Ryan",
          "title": "Sex at Dawn: The Prehistoric Origins of Modern Sexuality",
          "level": 50
        },
        {
          "title": "Survivor",
          "author": "Chuck Palahniuk",
          "level": 1
        },
        {
          "title": "Invisible Monsters",
          "author": "Chuck Palahniuk",
          "level": 1
        },
        {
          "author": "Chuck Palahniuk",
          "title": "Fight Club",
          "level": 50
        },
        {
          "author": "Chuck Palahniuk",
          "title": "Haunted",
          "level": 1
        },
        {
          "author": "Clifford A. Pickover",
          "title": "The Math Book: From Pythagoras to the 57th Dimension, 250 Milestones in the History of Mathematics",
          "level": 1
        },
        {
          "author": "Clifford D. Simak",
          "title": "City",
          "level": 1
        },
        {
          "title": "No Country for Old Men",
          "author": "Cormac McCarthy",
          "level": 50
        },
        {
          "author": "Cormac McCarthy",
          "title": "The Road",
          "level": 50
        },
        {
          "author": "Cormac McCarthy",
          "title": "Child of God",
          "level": 1
        },
        {
          "author": "Dalton Trumbo",
          "title": "Johnny Got His Gun",
          "level": 1
        },
        {
          "title": "Predictably Irrational: The Hidden Forces that Shape Our Decisions",
          "author": "Dan Ariely",
          "level": 1
        },
        {
          "author": "Daniel J. Boorstin",
          "title": "The Discoverers: A History of Man's Search to Know His World and Himself",
          "level": 1
        },
        {
          "author": "Daniel Kahneman",
          "title": "Thinking, Fast and Slow",
          "level": 50
        },
        {
          "title": "The Story of the Human Body: Evolution, Health, and Disease",
          "author": "Daniel Lieberman",
          "level": 1
        },
        {
          "title": "Happiness: The Science Behind Your Smile",
          "author": "Daniel Nettle",
          "level": 1
        },
        {
          "title": "The Molecule of More: How a Single Chemical in Your Brain Drives Love, Sex, and Creativity - And Will Determine the Fate of the Human Race",
          "author": "Daniel Z. Lieberman MD, Michael E. Long",
          "level": 1
        },
        {
          "author": "Dashiell Hammett",
          "title": "The Maltese Falcon",
          "level": 1
        },
        {
          "title": "Getting Things Done: The Art of Stress-Free Productivity",
          "author": "David Allen",
          "level": 1
        },
        {
          "title": "How Music Works",
          "author": "David Byrne",
          "level": 1
        },
        {
          "title": "Origin Story: A Big History of Everything",
          "author": "David Christian",
          "level": 1
        },
        {
          "title": "Feeling Good: The New Mood Therapy",
          "author": "David D. Burns",
          "level": 1
        },
        {
          "author": "David M. Buss",
          "title": "Evolutionary Psychology: The New Science of the Mind",
          "level": 1
        },
        {
          "title": "Your Brain at Work: Strategies for Overcoming Distraction, Regaining Focus, and Working Smarter All Day Long",
          "author": "David Rock",
          "level": 1
        },
        {
          "title": "Your Brain Is a Time Machine: The Neuroscience and Physics of Time",
          "author": "Dean Buonomano",
          "level": 1
        },
        {
          "title": "Watchers",
          "author": "Dean Koontz",
          "level": 1
        },
        {
          "title": "Forever Today: A Memoir Of Love And Amnesia",
          "author": "Deborah Wearing",
          "level": 1
        },
        {
          "title": "How to Think Like a Roman Emperor: The Stoic Philosophy of Marcus Aurelius",
          "author": "Donald Robertson",
          "level": 1
        },
        {
          "author": "Douglas R. Hofstadter",
          "title": "Gödel, Escher, Bach: An Eternal Golden Braid",
          "level": 1
        },
        {
          "title": "The Obesity Code: Unlocking the Secrets of Weight Loss",
          "author": "Dr. Jason Fung",
          "level": 1
        },
        {
          "title": "You Are the Placebo: Making Your Mind Matter",
          "author": "Dr. Joe Dispenza",
          "level": 1
        },
        {
          "title": "The Power of Now",
          "author": "Eckhart Tolle",
          "level": 1
        },
        {
          "title": "Mythology",
          "author": "Edith Hamilton",
          "level": 1
        },
        {
          "title": "The Roman Way",
          "author": "Edith Hamilton",
          "level": 1
        },
        {
          "title": "The Greek Way",
          "author": "Edith Hamilton",
          "level": 1
        },
        {
          "title": "The Sixth Extinction: An Unnatural History",
          "author": "Elizabeth Kolbert",
          "level": 1
        },
        {
          "author": "Emily St. John Mandel",
          "title": "Station Eleven",
          "level": 1
        },
        {
          "title": "In Search of Memory: The Emergence of a New Science of Mind",
          "author": "Eric R. Kandel",
          "level": 1
        },
        {
          "title": "The Age of Insight: The Quest to Understand the Unconscious in Art, Mind, and Brain, from Vienna 1900 to the Present",
          "author": "Eric R. Kandel",
          "level": 1
        },
        {
          "title": "The Disordered Mind: What Unusual Brains Tell Us About Ourselves",
          "author": "Eric R. Kandel",
          "level": 1
        },
        {
          "author": "Erich Maria Remarque",
          "title": "Three Comrades",
          "level": 1
        },
        {
          "author": "Erich Maria Remarque",
          "title": "The Black Obelisk",
          "level": 1
        },
        {
          "title": "The Origins And History Of Consciousness (International Library of Psychology)",
          "author": "Erich Neumann",
          "level": 1
        },
        {
          "author": "Ernest Hemingway",
          "title": "For Whom the Bell Tolls",
          "level": 1
        },
        {
          "title": "The Sun Also Rises: The Hemingway Library Edition",
          "author": "Ernest Hemingway",
          "level": 1
        },
        {
          "author": "F. Scott Fitzgerald",
          "title": "The Great Gatsby",
          "level": 1
        },
        {
          "title": "The Book of Disquiet (Penguin Modern Classics)",
          "author": "Fernando Pessoa",
          "level": 1
        },
        {
          "title": "Neuroscience for Dummies, 2nd Edition",
          "author": "Frank Amthor",
          "level": 1
        },
        {
          "title": "Dune",
          "author": "Frank Herbert",
          "level": 1
        },
        {
          "author": "Franz Kafka",
          "title": "The Trial",
          "level": 1
        },
        {
          "title": "And Every Morning the Way Home Gets Longer and Longer: A Novella",
          "author": "Fredrik Backman",
          "level": 1
        },
        {
          "title": "Jung - An Introduction to His Psychology",
          "author": "Frieda Fordham",
          "level": 1
        },
        {
          "author": "Friedrich Nietzsche",
          "title": "Beyond Good and Evil",
          "level": 1
        },
        {
          "title": "Thus Spake Zarathustra",
          "author": "Friedrich Wilhelm Nietzsche",
          "level": 1
        },
        {
          "title": "Devils",
          "author": "Fyodor Dostoevsky",
          "level": 1
        },
        {
          "title": "The Idiot",
          "author": "Fyodor Dostoyevsky",
          "level": 1
        },
        {
          "title": "The Dream of a Ridiculous Man",
          "author": "Fyodor Dostoyevsky",
          "level": 1
        },
        {
          "author": "Fyodor Dostoyevsky",
          "title": "The Brothers Karamazov",
          "level": 1
        },
        {
          "author": "Fyodor Dostoyevsky",
          "title": "Demons",
          "level": 1
        },
        {
          "title": "The Idiot - Classic Illustrated Edition",
          "author": "Fyodor Dostoyevsky",
          "level": 1
        },
        {
          "title": "The Brothers Karamazov (Dover Thrift Editions)",
          "author": "Fyodor Dostoyevsky",
          "level": 1
        },
        {
          "title": "How to Solve It: A New Aspect of Mathematical Method (Princeton Science Library)",
          "author": "G. Polya",
          "level": 1
        },
        {
          "author": "Gabriel Garcí­a Márquez",
          "title": "Love in the Time of Cholera",
          "level": 1
        },
        {
          "author": "Gabriel Garcí­a Márquez",
          "title": "Chronicle of a Death Foretold",
          "level": 1
        },
        {
          "author": "Gabriel Garcí­a Márquez",
          "title": "Of Love and Other Demons",
          "level": 1
        },
        {
          "title": "The Twelve Caesars",
          "author": "Gaius Suetonius Tranquillus",
          "level": 1
        },
        {
          "title": "The Case Against Sugar",
          "author": "Gary Taubes",
          "level": 1
        },
        {
          "author": "Geoffrey Miller",
          "title": "The Mating Mind: How Sexual Choice Shaped the Evolution of Human Nature",
          "level": 1
        },
        {
          "title": "Thirty Years that Shook Physics: The Story of Quantum Theory",
          "author": "George Gamow",
          "level": 1
        },
        {
          "author": "Graham Hancock",
          "title": "Magicians of the Gods: The Forgotten Wisdom of Earth's Lost Civilization",
          "level": 1
        },
        {
          "title": "Essentialism: The Disciplined Pursuit of Less",
          "author": "Greg McKeown",
          "level": 1
        },
        {
          "author": "Haruki Murakami",
          "title": "Kafka on the Shore",
          "level": 1
        },
        {
          "author": "Haruki Murakami",
          "title": "1Q84",
          "level": 1
        },
        {
          "author": "Henri F. Ellenberger",
          "title": "The Discovery of the Unconscious: The History and Evolution of Dynamic Psychiatry",
          "level": 1
        },
        {
          "author": "Hermann Hesse",
          "title": "Steppenwolf",
          "level": 1
        },
        {
          "author": "Ian Stewart",
          "title": "Why Beauty Is Truth: A History of Symmetry",
          "level": 1
        },
        {
          "title": "The Courage To Be Disliked: How to free yourself, change your life and achieve real happiness",
          "author": "Ichiro Kishimi",
          "level": 1
        },
        {
          "author": "Ivo Andrić",
          "title": "The Bridge on the Drina (Bosnian Trilogy, #1)",
          "level": 1
        },
        {
          "title": "But How Do It Know? - The Basic Principles of Computers for Everyone",
          "author": "J Clark Scott",
          "level": 1
        },
        {
          "author": "J.D. Salinger",
          "title": "The Catcher in the Rye",
          "level": 1
        },
        {
          "author": "Jack Kerouac",
          "title": "Big Sur",
          "level": 1
        },
        {
          "title": "Desolation Angels (Penguin Modern Classics)",
          "author": "Jack Kerouac",
          "level": 1
        },
        {
          "title": "Atomic Habits",
          "author": "James Clear",
          "level": 1
        },
        {
          "author": "James Jones",
          "title": "The Thin Red Line",
          "level": 1
        },
        {
          "title": "10 Masterpieces You Have to Read Before You Die 1",
          "author": "Jane Austen, Charles Dickens, Louisa May Alcott, Mark Twain, Homer, Marcus Aurelius",
          "level": 1
        },
        {
          "author": "Jared Diamond",
          "title": "Guns, Germs, and Steel: The Fates of Human Societies",
          "level": 1
        },
        {
          "author": "Jared Diamond",
          "title": "Collapse: How Societies Choose to Fail or Succeed",
          "level": 1
        },
        {
          "author": "Jared Diamond",
          "title": "Upheaval: Turning Points for Nations in Crisis",
          "level": 1
        },
        {
          "title": "Effective Programming: More Than Writing Code",
          "author": "Jeff Atwood",
          "level": 1
        },
        {
          "title": "The Others",
          "author": "Jeremy Robinson",
          "level": 1
        },
        {
          "title": "My Stroke of Insight",
          "author": "Jill Bolte Taylor",
          "level": 1
        },
        {
          "title": "Keto Cookbook: Keto Cookbook for Beginners 2020 with 21-Days Keto Meal Plan: Keto Diet: Keto Diet for Beginners: Keto Book with Easy to Cook Low Carb Recipes for Weight Loss (Keto Diet Books 1)",
          "author": "Jimmy Houck",
          "level": 1
        },
        {
          "title": "Discipline Equals Freedom: Field Manual",
          "author": "Jocko Willink",
          "level": 1
        },
        {
          "title": "The Power of Body Language: An Ex-FBI Agent's System for Speed-Reading People",
          "author": "Joe Navarro",
          "level": 1
        },
        {
          "title": "Dangerous Personalities: An FBI Profiler Shows You How to Identify and Protect Yourself from Harmful People",
          "author": "Joe Navarro, Toni Sciarra Poynter",
          "level": 1
        },
        {
          "author": "John Derbyshire",
          "title": "Prime Obsession: Bernhard Riemann and the Greatest Unsolved Problem in Mathematics",
          "level": 1
        },
        {
          "title": "The Killer Across the Table: Unlocking the Secrets of Serial Killers and Predators with the FBI's Original Mindhunter",
          "author": "John E. Douglas, Mark Olshaker",
          "level": 1
        },
        {
          "author": "John Irving",
          "title": "The World According to Garp",
          "level": 1
        },
        {
          "author": "John Irving",
          "title": "A Prayer for Owen Meany",
          "level": 1
        },
        {
          "title": "The Power Of Babel: A Natural History of Language",
          "author": "John McWhorter",
          "level": 1
        },
        {
          "title": "Stoicism (Ancient Philosophies)",
          "author": "John Sellars",
          "level": 1
        },
        {
          "title": "Of Mice and Men",
          "author": "John Steinbeck",
          "level": 1
        },
        {
          "title": "The Winter of Our Discontent",
          "author": "John Steinbeck",
          "level": 1
        },
        {
          "title": "The Short Novels of John Steinbeck: (Penguin Classics Deluxe Edition)",
          "author": "John Steinbeck",
          "level": 1
        },
        {
          "author": "John Williams",
          "title": "Stoner",
          "level": 1
        },
        {
          "title": "Lost at Sea: The Jon Ronson Mysteries",
          "author": "Jon Ronson",
          "level": 1
        },
        {
          "title": "The Happiness Hypothesis",
          "author": "Jonathan Haidt",
          "level": 1
        },
        {
          "title": "The Righteous Mind: Why Good People Are Divided by Politics and Religion",
          "author": "Jonathan Haidt",
          "level": 1
        },
        {
          "title": "Maps of Meaning",
          "author": "Jordan B. Peterson",
          "level": 1
        },
        {
          "title": "The Hero with a Thousand Faces",
          "author": "Joseph Campbell",
          "level": 1
        },
        {
          "title": "The Power of Myth",
          "author": "Joseph Campbell",
          "level": 1
        },
        {
          "author": "Joseph Frank",
          "title": "Dostoevsky: A Writer in His Time",
          "level": 1
        },
        {
          "title": "Catch-22",
          "author": "Joseph Heller",
          "level": 1
        },
        {
          "title": "The Emotional Brain: The Mysterious Underpinnings of Emotional Life",
          "author": "Joseph Ledoux",
          "level": 1
        },
        {
          "author": "Joshua Foer",
          "title": "Moonwalking with Einstein: The Art and Science of Remembering Everything",
          "level": 1
        },
        {
          "author": "José Saramago",
          "title": "Blindness",
          "level": 1
        },
        {
          "title": "The Horse's Mouth",
          "author": "Joyce Cary",
          "level": 1
        },
        {
          "title": "The Book of Why: The New Science of Cause and Effect",
          "author": "Judea Pearl",
          "level": 1
        },
        {
          "author": "Julie Rollins",
          "title": "Arana's Visitor (The Vadelah Chronicles, #1)",
          "level": 1
        },
        {
          "author": "Kaye Gibbons",
          "title": "Ellen Foster",
          "level": 1
        },
        {
          "author": "Kazuo Ishiguro",
          "title": "The Remains of the Day",
          "level": 1
        },
        {
          "author": "Ken Kesey",
          "title": "One Flew Over the Cuckoo's Nest",
          "level": 1
        },
        {
          "title": "Why Greatness Cannot Be Planned: The Myth of the Objective",
          "author": "Kenneth O. Stanley",
          "level": 1
        },
        {
          "title": "Stoicism For Beginners: Master the Art of Happiness. Learn Modern, Practical Stoicism to Create Your Own Daily Stoic Routine",
          "author": "Kevin Garnett",
          "level": 1
        },
        {
          "title": "Unlimited Memory: How to Use Advanced Learning Strategies to Learn Faster, Remember More and be More Productive",
          "author": "Kevin Horsley",
          "level": 1
        },
        {
          "title": "The Elephant in the Brain: Hidden Motives in Everyday Life",
          "author": "Kevin Simler, Robin Hanson",
          "level": 1
        },
        {
          "title": "The Kite Runner",
          "author": "Khaled Hosseini",
          "level": 1
        },
        {
          "title": "Black Holes & Time Warps: Einstein's Outrageous Legacy (Commonwealth Fund Book Program)",
          "author": "Kip Thorne",
          "level": 1
        },
        {
          "title": "Galapagos",
          "author": "Kurt Vonnegut",
          "level": 1
        },
        {
          "author": "Kōbō Abe",
          "title": "The Woman in the Dunes",
          "level": 1
        },
        {
          "author": "Lauren Robinson",
          "title": "The Boy Who Saw In Colours",
          "level": 1
        },
        {
          "title": "Anna Karenina",
          "author": "Leo Tolstoy",
          "level": 1
        },
        {
          "author": "Leo Tolstoy",
          "title": "Resurrection",
          "level": 1
        },
        {
          "author": "Leo Tolstoy",
          "title": "The Death of Ivan Ilych",
          "level": 1
        },
        {
          "title": "The Greatest Short Stories of Leo Tolstoy",
          "author": "Leo Tolstoy",
          "level": 1
        },
        {
          "title": "How Emotions Are Made: The Secret Life of the Brain",
          "author": "Lisa Feldman Barrett",
          "level": 1
        },
        {
          "author": "Louis-Ferdinand Céline",
          "title": "Journey to the End of the Night",
          "level": 1
        },
        {
          "title": "Seneca's Letters from a Stoic (Dover Thrift Editions)",
          "author": "Lucius Annaeus Seneca",
          "level": 1
        },
        {
          "author": "Luke Rhinehart",
          "title": "The Dice Man",
          "level": 1
        },
        {
          "author": "Madeleine L'Engle",
          "title": "A Wrinkle in Time (Time Quintet, #1)",
          "level": 1
        },
        {
          "title": "Talking to Strangers: What We Should Know About the People We Don't Know",
          "author": "Malcolm Gladwell",
          "level": 1
        },
        {
          "author": "Malcolm Gladwell",
          "title": "The Tipping Point: How Little Things Can Make a Big Difference",
          "level": 1
        },
        {
          "author": "Malcolm Gladwell",
          "title": "Outliers: The Story of Success",
          "level": 1
        },
        {
          "author": "Malcolm Gladwell",
          "title": "Blink: The Power of Thinking Without Thinking",
          "level": 1
        },
        {
          "title": "Your Brain, Explained: What Neuroscience Reveals about Your Brain and its Quirks",
          "author": "Marc Dingman",
          "level": 1
        },
        {
          "author": "Marcel Proust",
          "title": "Swann's Way",
          "level": 1
        },
        {
          "title": "The Stone Angel",
          "author": "Margaret Laurence",
          "level": 1
        },
        {
          "author": "Mario Puzo",
          "title": "The Godfather",
          "level": 1
        },
        {
          "author": "Mario Vargas Llosa",
          "title": "The Feast of the Goat",
          "level": 1
        },
        {
          "title": "The War of the End of the World: A Novel",
          "author": "Mario Vargas Llosa",
          "level": 1
        },
        {
          "title": "Cows, Pigs, Wars, and Witches: The Riddles of Culture",
          "author": "Marvin Harris",
          "level": 1
        },
        {
          "author": "Max Tegmark",
          "title": "Life 3.0: Being Human in the Age of Artificial Intelligence",
          "level": 1
        },
        {
          "title": "Our Mathematical Universe: My Quest for the Ultimate Nature of Reality",
          "author": "Max Tegmark",
          "level": 1
        },
        {
          "title": "Complexity: A Guided Tour",
          "author": "Melanie Mitchell",
          "level": 1
        },
        {
          "title": "The Second Brain: A Groundbreaking New Understanding of Nervous Disorders of the Stomach and Intestine",
          "author": "Michael Gershon",
          "level": 1
        },
        {
          "title": "Soft-Wired: How the New Science of Brain Plasticity Can Change your Life",
          "author": "Michael Merzenich",
          "level": 1
        },
        {
          "title": "Don Quixote",
          "author": "Miguel de Cervantes",
          "level": 1
        },
        {
          "title": "Creativity: The Psychology of Discovery and Invention",
          "author": "Mihaly Csikszentmihalyi",
          "level": 1
        },
        {
          "title": "Flow: The Psychology of Optimal Experience (Harper Perennial Modern Classics)",
          "author": "Mihaly Csikszentmihalyi",
          "level": 1
        },
        {
          "title": "Ruined by Design: How Designers Destroyed the World, and What We Can Do to Fix It",
          "author": "Mike Monteiro",
          "level": 1
        },
        {
          "author": "Milan Kundera",
          "title": "The Unbearable Lightness of Being",
          "level": 1
        },
        {
          "author": "Mitch Albom",
          "title": "Tuesdays with Morrie",
          "level": 1
        },
        {
          "title": "The Black Swan: The Impact of the Highly Improbable",
          "author": "Nassim Nicholas Taleb",
          "level": 1
        },
        {
          "title": "The Now Habit",
          "author": "Neil Fiore Ph.D.",
          "level": 1
        },
        {
          "title": "Norse Mythology",
          "author": "Neil Gaiman",
          "level": 1
        },
        {
          "title": "American Gods: The Tenth Anniversary Edition: A Novel",
          "author": "Neil Gaiman",
          "level": 1
        },
        {
          "title": "Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch",
          "author": "Neil Gaiman",
          "level": 1
        },
        {
          "title": "The Sandman",
          "author": "Neil Gaiman, Dirk Maggs",
          "level": 1
        },
        {
          "title": "The Happiness Equation: Want Nothing + Do Anything = Have Everything",
          "author": "Neil Pasricha",
          "level": 1
        },
        {
          "title": "I Can't Make This Up: Life Lessons",
          "author": "Neil Strauss - contributor, Kevin Hart",
          "level": 1
        },
        {
          "title": "Blueprint: The Evolutionary Origins of a Good Society",
          "author": "Nicholas A. Christakis",
          "level": 1
        },
        {
          "author": "Nicholas Pileggi",
          "title": "Wiseguy",
          "level": 1
        },
        {
          "title": "A Little History of Philosophy",
          "author": "Nigel Warburton",
          "level": 1
        },
        {
          "author": "Nikolai Gogol",
          "title": "Dead Souls",
          "level": 1
        },
        {
          "title": "Zorba the Greek",
          "author": "Nikos Kazantzakis",
          "level": 1
        },
        {
          "title": "The Big Fat Surprise: Why Butter, Meat, and Cheese Belong in a Healthy Diet",
          "author": "Nina Teicholz",
          "level": 1
        },
        {
          "title": "The Brain That Changes Itself: Stories of Personal Triumph from the Frontiers of Brain Science",
          "author": "Norman Doidge",
          "level": 1
        },
        {
          "author": "Norman Mailer",
          "title": "The Executioner's Song",
          "level": 1
        },
        {
          "title": "The Phantom Tollbooth",
          "author": "Norton Juster",
          "level": 1
        },
        {
          "title": "On the Move: A Life",
          "author": "Oliver Sacks",
          "level": 1
        },
        {
          "title": "Pandora’s Lab: Seven Stories of Science Gone Wrong",
          "author": "Paul A. Offit MD",
          "level": 1
        },
        {
          "title": "The Master Algorithm: How the Quest for the Ultimate Learning Machine Will Remake Our World",
          "author": "Pedro Domingos",
          "level": 1
        },
        {
          "title": "Quitting (previously published as Mastering the Art of Quitting): Why We Fear It--and Why We Shouldn't--in Life, Love, and Work",
          "author": "Peg Streep",
          "level": 1
        },
        {
          "title": "The Ends of the World: Volcanic Apocalypses, Lethal Oceans, and Our Quest to Understand Earth's Past Mass Extinctions",
          "author": "Peter Brannen",
          "level": 1
        },
        {
          "title": "Make It Stick: The Science of Successful Learning",
          "author": "Peter C. Brown",
          "level": 1
        },
        {
          "title": "The Science of Self-Learning: How to Teach Yourself Anything, Learn More in Less Time, and Direct Your Own Education (Learning how to Learn Book 1)",
          "author": "Peter Hollins",
          "level": 1
        },
        {
          "title": "Minority Report and Other Stories (Unabridged Stories)",
          "author": "Philip K. Dick",
          "level": 1
        },
        {
          "title": "Philosophy 100 Essential Thinkers",
          "author": "Philip Stokes",
          "level": 1
        },
        {
          "title": "The Time Paradox: The New Psychology of Time That Will Change Your Life",
          "author": "Philip Zimbardo, John Boyd",
          "level": 1
        },
        {
          "title": "The Son",
          "author": "Philipp Meyer",
          "level": 1
        },
        {
          "title": "Neuroplasticity: Your Brain's Superpower: Change Your Brain and Change Your Life",
          "author": "Philippe Douyon",
          "level": 1
        },
        {
          "title": "The Trial and Death of Socrates: Four Dialogues (Dover Thrift Editions)",
          "author": "Plato",
          "level": 1
        },
        {
          "title": "Five Dialogues: Euthyphro, Apology, Crito, Meno, Phaedo (Annotated)",
          "author": "Plato",
          "level": 1
        },
        {
          "title": "Symposium - Classic Illustrated Edition",
          "author": "Plato",
          "level": 1
        },
        {
          "title": "30 Interactive Brainteasers to Warm up your Brain (Riddles & Brain teasers, puzzles, puzzles & games)",
          "author": "Puzzleland",
          "level": 1
        },
        {
          "author": "Rainer Maria Rilke",
          "title": "Ahead of All Parting: The Selected Poetry and Prose",
          "level": 1
        },
        {
          "title": "How to Create a Mind: The Secret of Human Thought Revealed",
          "author": "Ray Kurzweil",
          "level": 1
        },
        {
          "title": "A Paradise Built in Hell: The Extraordinary Communities That Arise in Disaster",
          "author": "Rebecca Solnit",
          "level": 1
        },
        {
          "title": "Human Psychology: 4 Books in 1: How to Analyze People + Manipulation Techniques + Dark Psychology + Enneagram: Powerful Guides to Learn Persuasion, Mind Control, Body Language and People's Behaviour",
          "author": "Richard Campbell",
          "level": 1
        },
        {
          "title": "The 80/20 Principle: The Secret of Achieving More with Less: Updated 20th anniversary edition of the productivity and business classic",
          "author": "Richard Koch",
          "level": 1
        },
        {
          "title": "I Am Legend",
          "author": "Richard Matheson",
          "level": 1
        },
        {
          "title": "Surely You're Joking, Mr. Feynman!",
          "author": "Richard P. Feynman",
          "level": 1
        },
        {
          "title": "\"What Do You Care What Other People Think?\": Further Adventures of a Curious Character",
          "author": "Richard P. Feynman",
          "level": 1
        },
        {
          "title": "Simply Einstein: Relativity Demystified",
          "author": "Richard Wolfson",
          "level": 1
        },
        {
          "title": "Revolutionary Road (Vintage Classics)",
          "author": "Richard Yates",
          "level": 1
        },
        {
          "title": "Hardwiring Happiness: The New Brain Science of Contentment, Calm, and Confidence",
          "author": "Rick Hanson",
          "level": 1
        },
        {
          "author": "Roald Dahl",
          "title": "Matilda",
          "level": 1
        },
        {
          "author": "Robert A. Heinlein",
          "title": "Stranger in a Strange Land",
          "level": 1
        },
        {
          "title": "The Moon is a Harsh Mistress",
          "author": "Robert A. Heinlein",
          "level": 1
        },
        {
          "title": "Influence: The Psychology of Persuasion",
          "author": "Robert B. Cialdini",
          "level": 1
        },
        {
          "title": "I, Claudius (Robert Graves Book 1)",
          "author": "Robert Graves",
          "level": 1
        },
        {
          "title": "The Laws of Human Nature",
          "author": "Robert Greene",
          "level": 1
        },
        {
          "title": "Mastery",
          "author": "Robert Greene",
          "level": 1
        },
        {
          "title": "Zen and the Art of Motorcycle Maintenance: An Inquiry Into Values",
          "author": "Robert M. Pirsig",
          "level": 1
        },
        {
          "title": "Behave: The Biology of Humans at Our Best and Worst",
          "author": "Robert M. Sapolsky",
          "level": 1
        },
        {
          "title": "Why Zebras Don't Get Ulcers: The Acclaimed Guide to Stress, Stress-Related Diseases, and Coping (Third Edition)",
          "author": "Robert M. Sapolsky",
          "level": 1
        },
        {
          "author": "Robert Wright",
          "title": "The Moral Animal: Why We Are the Way We Are - The New Science of Evolutionary Psychology",
          "level": 1
        },
        {
          "title": "The Monk Who Sold His Ferrari",
          "author": "Robin Sharma",
          "level": 1
        },
        {
          "title": "No Stopping You!: How to Win the Game of Life",
          "author": "Roger E. Flax",
          "level": 1
        },
        {
          "title": "Psychology",
          "author": "Rose M. Spielman",
          "level": 1
        },
        {
          "title": "Modern Man in Search of a Soul (Routledge Classics)",
          "author": "Routledge",
          "level": 1
        },
        {
          "title": "Ego Is the Enemy",
          "author": "Ryan Holiday",
          "level": 1
        },
        {
          "title": "Stillness Is the Key",
          "author": "Ryan Holiday",
          "level": 1
        },
        {
          "title": "The Tale of the Dueling Neurosurgeons: The History of the Human Brain as Revealed by True Stories of Trauma, Madness, and Recovery",
          "author": "Sam Kean",
          "level": 1
        },
        {
          "title": "Activate Your Brain: How Understanding Your Brain Can Improve Your Work - and Your Life",
          "author": "Scott G. Halford",
          "level": 1
        },
        {
          "title": "Ultralearning: Master Hard Skills, Outsmart the Competition, and Accelerate Your Career",
          "author": "Scott Young",
          "level": 1
        },
        {
          "author": "Sean B. Carroll",
          "title": "Endless Forms Most Beautiful: The New Science of Evo Devo and the Making of the Animal Kingdom",
          "level": 1
        },
        {
          "title": "Something Deeply Hidden: Quantum Worlds and the Emergence of Spacetime",
          "author": "Sean Carroll",
          "level": 1
        },
        {
          "author": "Sebastian Faulks",
          "title": "Birdsong: A Novel of Love and War",
          "level": 1
        },
        {
          "title": "Tribe: On Homecoming and Belonging",
          "author": "Sebastian Junger",
          "level": 1
        },
        {
          "title": "The Psychopathology of Everyday Life",
          "author": "Sigmund Freud",
          "level": 1
        },
        {
          "title": "The Interpretation of Dreams",
          "author": "Sigmund Freud",
          "level": 1
        },
        {
          "title": "Either/Or: A Fragment of Life (Penguin Classics)",
          "author": "Soren Kierkegaard",
          "level": 1
        },
        {
          "title": "The Charterhouse of Parma",
          "author": "Stendhal",
          "level": 1
        },
        {
          "title": "The Red and the Black (Xist Classics)",
          "author": "Stendhal",
          "level": 1
        },
        {
          "title": "Mythos",
          "author": "Stephen Fry",
          "level": 1
        },
        {
          "title": "Lisey's Story",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Skeleton Crew",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Duma Key: A Novel",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "The Stand",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Rose Madder",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Dreamcatcher",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "The Dark Tower I: The Gunslinger",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "The Tommyknockers",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "It",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Needful Things",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Pet Sematary",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Skeleton Crew: featuring The Mist",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Night Shift",
          "author": "Stephen King",
          "level": 1
        },
        {
          "title": "Dark Tower I: The Gunslinger: (Volume 1) (The Dark Tower)",
          "author": "Stephen King",
          "level": 1
        },
        {
          "author": "Stephen R. Covey",
          "title": "First Things First",
          "level": 1
        },
        {
          "author": "Steven H. Strogatz",
          "title": "The Joy of x: A Guided Tour of Math, from One to Infinity",
          "level": 1
        },
        {
          "title": "How the Mind Works",
          "author": "Steven Pinker",
          "level": 1
        },
        {
          "title": "The Language Instinct: How The Mind Creates Language (P.S.)",
          "author": "Steven Pinker",
          "level": 1
        },
        {
          "title": "Enlightenment Now: The Case for Reason, Science, Humanism, and Progress",
          "author": "Steven Pinker",
          "level": 1
        },
        {
          "title": "The Virtues of War: A Novel of Alexander the Great",
          "author": "Steven Pressfield",
          "level": 1
        },
        {
          "title": "Do the Work",
          "author": "Steven Pressfield",
          "level": 1
        },
        {
          "author": "Steven Pressfield",
          "title": "Gates of Fire",
          "level": 1
        },
        {
          "title": "Infinite Powers: How Calculus Reveals the Secrets of the Universe",
          "author": "Steven Strogatz",
          "level": 1
        },
        {
          "author": "Susan Cain",
          "title": "Quiet: The Power of Introverts in a World That Can't Stop Talking",
          "level": 1
        },
        {
          "title": "Bulfinch's Mythology (The Age of Fable - The Age of Chivalry - Legends of Charlemagne) (Illustrated)",
          "author": "Thomas Bulfinch",
          "level": 1
        },
        {
          "author": "Thomas Mann",
          "title": "The Magic Mountain",
          "level": 1
        },
        {
          "title": "The Myth of Mental Illness: Foundations of a Theory of Personal Conduct",
          "author": "Thomas S. Szasz",
          "level": 1
        },
        {
          "title": "The High Price of Materialism (A Bradford Book)",
          "author": "Tim Kasser",
          "level": 1
        },
        {
          "author": "Tim O'Brien",
          "title": "The Things They Carried",
          "level": 1
        },
        {
          "title": "Do Zombies Dream of Undead Sheep?: A Neuroscientific View of the Zombie Brain",
          "author": "Timothy Verstynen",
          "level": 1
        },
        {
          "author": "Tracy Chevalier",
          "title": "Girl with a Pearl Earring",
          "level": 1
        },
        {
          "title": "Batman and Psychology: A Dark and Stormy Knight",
          "author": "Travis Langley, Michael Uslan, Dennis O’Neil",
          "level": 1
        },
        {
          "title": "In Cold Blood",
          "author": "Truman Capote",
          "level": 1
        },
        {
          "title": "Breakfast at Tiffany's",
          "author": "Truman Capote",
          "level": 1
        },
        {
          "title": "The Tell-Tale Brain: A Neuroscientist's Quest for What Makes Us Human",
          "author": "V. S. Ramachandran",
          "level": 1
        },
        {
          "title": "Phantoms in the Brain: Probing the Mysteries of the Human Mind",
          "author": "V.S. Ramachandran, Sandra Blakeslee",
          "level": 1
        },
        {
          "author": "Victor Hugo",
          "title": "Les Misérables",
          "level": 1
        },
        {
          "title": "Man's Search for Meaning",
          "author": "Viktor E. Frankl",
          "level": 1
        },
        {
          "title": "Pnin",
          "author": "Vladimir Nabokov",
          "level": 1
        },
        {
          "title": "Einstein: His Life and Universe",
          "author": "Walter Isaacson",
          "level": 1
        },
        {
          "title": "The Practicing Stoic: A Philosophical User's Manual",
          "author": "Ward Farnsworth",
          "level": 1
        },
        {
          "title": "The Story of Philosophy: The Lives and Opinions of the Greater Philosophers",
          "author": "Will Durant",
          "level": 1
        },
        {
          "title": "The Greatest Minds and Ideas of All Time",
          "author": "Will Durant",
          "level": 1
        },
        {
          "title": "The Lessons of History",
          "author": "Will Durant",
          "level": 1
        },
        {
          "title": "The Story of Philosophy",
          "author": "Will Durant",
          "level": 1
        },
        {
          "title": "A Guide to the Good Life: The Ancient Art of Stoic Joy",
          "author": "William B. Irvine",
          "level": 1
        },
        {
          "author": "William Faulkner",
          "title": "The Sound and the Fury",
          "level": 1
        },
        {
          "author": "William Goldman",
          "title": "The Princess Bride",
          "level": 1
        },
        {
          "title": "The Social Leap: The New Evolutionary Science of Who We Are, Where We Come From, and What Makes Us Happy",
          "author": "William von Hippel",
          "level": 1
        },
        {
          "title": "We (Momentum Classic Science Fiction)",
          "author": "Yevgeny Zamyatin",
          "level": 1
        },
        {
          "title": "Sapiens: A Brief History of Humankind",
          "author": "Yuval Noah Harari",
          "level": 1
        },
        {
          "title": "Homo Deus: A Brief History of Tomorrow",
          "author": "Yuval Noah Harari",
          "level": 1
        }
      ]

    useEffect(() => {
        fetch('http://localhost:3002/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            setBooks([...data])
        })

       // setBooks([...booksData])
    }, []);

    const addToDelete = what => {
        if (toDelete.includes(what)) return
        setToDelete([what, ...toDelete])

        setTimeout(() => {
            localStorage.setItem("selected", JSON.stringify({seleceted: toDelete})); 
        }, 100);
    }


    const removeFromArray = (array, el) => {
        const index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array
    }

    const removeFromDelete = what => {
        const newarr = removeFromArray(toDelete, what)
        setToDelete([...newarr])
        setTimeout(() => {
            localStorage.setItem("selected", JSON.stringify({seleceted: toDelete})); 
        }, 100);
    }

    const search = (what) => {
        window.open('http://google.com/search?q='+what);
    }

    const indexes = toDelete.map(i => i + ',')

    const getItems = (items, keys) => items
        .map(({ title, author, level }, i) =>
            <li key={i + 'items' + keys}>
                <a href={'http://google.com/search?q=' + title} >=></a>
                <button disabled={toDelete.includes(i)} onClick={e => addToDelete(i)}>+</button>
                <button onClick={e => removeFromDelete(i)}>x</button>
<span style={{ color: toDelete.includes(i) ? 'red' : 'black', fontWeight: level > 1 ? 'bold' : 'normal' }}>{author} - {title}</span>
            </li>
        )
    const getBest = (items, keys) => items
        .map(({ title, author, level }, i) =>
            <li key={i + 'items-best' + keys}>
                <span style={{ color: toDelete.includes(i) ? 'red' : 'black', fontWeight: level > 1 ? 'bold' : 'normal' }}>{author} - {title}</span>
            </li>
        )


    const sortBooks = what => {



        function compare(a, b) {
            if (a.author < b.author) {
                return -1;
            }
            if (a.author > b.author) {
                return 1;
            }
            return 0;
        }

        const neww = what.sort(compare);

        //console.log(newList.map(({author})=> author), neww.map(({author})=> author))
        console.log(neww)
    }

    const filterGreatCourses = () => {
        const greatCourses = books.filter(book => {
            const author = book.author.toLowerCase()
            
            if (author.includes('great cour')) {
                
                return book
            }
        })

        const other = books.filter(book => !greatCourses.includes(book))


        console.log(other)
        console.log(books)
        return
    }

    const removeBooks = what => {
        let newList = what.filter((item, i) => !toDelete.includes(i))

        console.log(newList)

        setBooks([...newList])
        setToDelete([])
    }

    const showme = what =>  {
        
        // const newBooks = books.map(book => ({
        //     ...book,
        //     level: toDelete.includes(book.id)
        // }))

        // fetch('http://localhost:3002/')
        // .then(response => response.json())
        // .then(console.log)

        // return

        removeBooks(what)

        return
        
        

        async function send() {

            books.forEach((book, i) => {
                if (book.level > 1) {
                    if (!toDelete.includes(i))
                        toDelete.push(i)
                }
            })
    
            books.forEach(i => i.level = 1)
            toDelete.forEach(i => books[i].level = 50)
    
            
            const rawResponse = await fetch('http://localhost:3002/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(books)
            }).then(data => console.log('dasda'))
          
        }

        send()
        


        return


        
        
        


        // const all = books.map(({title}) => title)
        // let uniqueTitles = []
        // let unique = []
        // let other = []

        // books.forEach(book => {
        //     if (!uniqueTitles.includes(book.title)) {
        //         unique.push(book)
        //     } else {
        //         other.push(book)
        //     }
        //     if (!uniqueTitles.includes(book.title)) uniqueTitles.push(book.title)
        // })
        // console.log('UNIQUE', unique)
        // console.log('old', other)
        

        // return
        
        //sortBooks(books)
        //return
        

        // let newww = what.map(({author, title}) => {
        //     const authorName = author.split(', ')
        //     const newAuthor = authorName[1] + ' ' + authorName[0]
        //     return {author: newAuthor, title}
        // })
        // console.log(newww)

        // return

        // const multiple = [...fromGoodreads, ...fromKindle]
        // console.log(multiple)

        // return



        //setToDelete([...newList])
    }

    return (
        <div className="wrapper">
            
            <div className="first-show">
                <button className="btn-show" onClick={_ => showme(books)}>showme</button>
                <div className="indexes">
                    {books.length}
                </div>
            </div>
            <div className="second">
                <div className="goodreads">
                    <ol>
                        {getItems(books, 'kindle')}
                    </ol>
                </div>
                <div className="best">
                    <h1>BEST/Essential</h1>
                    <ol>
                        {getBest(books.filter(book => book.level > 1), 'kindle')}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Testik;
