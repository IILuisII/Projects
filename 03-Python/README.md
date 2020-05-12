# Week 3 
## Objectives
This unit will start out with core features of Python, such as variable declarations, and move on to discuss more advanced and idiomatic features of the language. Topics will include reading and writing files, working with the file system, iteration using for loops, iteration using list comprehension, list methods, the notion of dictionaries and methods on them, and additional miscellany where required to facilitate completion of the homework assignment.

* Be able to navigate the desktop via the terminal.
* Create Python scripts and run them in terminal.
* Begin to understand programming concepts in Python.
* Feel confident reading data into Python from CSV files.
* Feel confident writing data from Python into CSV files.
* Know how to zip two lists together and when this is helpful.
* Have a firm understanding on how to create and use Python functions.
* Be able to create and use Python dictionaries.
* Be able to read data in from a dictionary.
* Have a firm understanding of coding logic and reasoning.


### **Additional Resources**  
* [Python - Beginner](https://www.learnpython.org/)

* **[Python Scripting](https://automatetheboringstuff.com/) good resource**

* [Python f-strings](https://www.python.org/dev/peps/pep-0498/)

* [Python DataStructures](https://docs.python.org/3/tutorial/datastructures.html)

* [Python CSV Module](https://docs.python.org/3/library/csv.html)

* [Git/Github](https://github.com/Multishifties/No-Nonsense-Github-Project)

* [Visual Git Guide](http://marklodato.github.io/visual-git-guide/index-en.html)

* [Python 3's f-Strings](https://realpython.com/python-f-strings/)

* **[Methods vs Functions](https://www.tutorialspoint.com/difference-between-method-and-function-in-python) good explanation**

* **[Loop Control Statements](https://python-textbok.readthedocs.io/en/1.0/Loop_Control_Statements.html) good explanation**



### Additional Course Resources

* [Python CheatSheet](../03-Python/Supplemental/Python_Reference_Guide.pdf)

* [Python-GettingStarted.md](../03-Python/Supplemental/Python-GettingStarted.md)

* [Virtual Environments](../03-Python/Supplemental/conda_pip.pdf)

* [Conda Cheatsheet](../03-Python/Supplemental/conda-cheatsheet.pdf)


## Lesson 1: Let's Begin Python
* Be able to navigate their desktop via the terminal.
* Be able to create Python scripts and run them in the terminal.
* Be able to understand basic programming concepts in Python.


* 01-Ins_Terminal  
    * Learning to traverse through command line and simple file structures.
    * Simple terminal command for git-bash:
      * `cd` (Changes the directory).

      * `cd ~` (Changes to the home directory).

      * `cd ..` (Moves up one directory).

      * `ls` (Lists files in the folder).

      * `pwd` (Shows the current directory).

      * `mkdir <FOLDERNAME>` (Creates a new directory with the FOLDERNAME).

      * `touch <FILENAME>` (Creates a new file with the FILENAME).

      * `rm <FILENAME>` (Deletes a file).

      * `rm -r <FOLDERNAME>` (Deletes a folder, note the -r).

      * `open .` (Opens the current folder on Macs).

      * `explorer .` (Opens the current folder on GitBash).

      * `open <FILENAME>` (Opens a specific file on Macs).

      * `explorer <FILENAME>` (Opens a specific file on GitBash).
        
* 02-Stu_TerminalTest  
    * Practice creating folders and files from terminal
    
* 03-Ins_Variables  
    * `variables` allow us to store information that we can/want to use later.  Variables can store a range of data types including (strings, booleans, integers, arrays, etc)
    * when printing and integer or boolean with a string must cast the integer / boolean to a `str()`
    * `f-string` allows you to quickly concatenate different data types.

    ```python
    var1 = 1
    # An f-string accepts all data types without conversion
    print(f'this is my {var1}st sentence in python')
    
    # prints out the below
    >>> this is my 1st sentence in python
    ```
    
* 04-Stu_HelloVariableWorld  
    * Practice creating various variable types (Strings, Integers, Boolean's) and using those variables to create additional variables.  

* 05-Ins_Prompts  
    * The function `input()` will take input from command line after printing a prompt to terminal.  You can store responses by assigning to a variable.  Every response to an input is stored as a `string` unless specifically cast to another dtype.  When `bool()` function used with input will always return `True` if any text is inside of it.
    
    ```python
    # Collects the user's input for the prompt "What is your name?"
    name = input("What is your name? ")

    # Collects the user's input for the prompt "How old are you?"
    # and converts the string to an integer.
    age = int(input("How old are you? "))

    # Collects the user's input for the prompt "Is input truthy?"
    # and converts it to a boolean.
    # Note that non-zero, non-empty objects are truth-y.
    trueOrFalse = bool(input("Is the input truthy? "))

    # Creates three print statements that to respond with the output.
    print("My name is " + str(name))
    print("I will be " + str(age + 1) + " next year.")
    print("The input was converted to " + str(trueOrFalse))

    ```

* 06-Stu_DownToInput  
    * Practice using `input()` function

* 07-Ins_Conditionals  **--Basic Understanding Homework--**
    * To create conditional in Python you use `if`, `elif`, `else`. Proper letter case does matter in Python.
    *  All lines after the colon **must be indented** to be considered a part of that code block. This is because Python reads blocks of code based on indentation.
    * Logical tests for if statements include:
        * `>=` greater than or equal
        * `<=` less than or equal
        * `==` is equal to
        * `!=` is not equal to
    * When using multiple logic tests with `and` both arguments must return `True` when using `or` only one needs to return as `True`

* 08-Stu_ConditionalConundrum  

* 09-Ins_List  **--Basic Understanding Homework--**
    * A `Python List` is equivalent to a VBA Array, with the ability to hold multiple pieces of data (strings, integers, and boolean, mixed types, etc values) within one variable. Several functions.  List starts with an _index of 0_
    * Pro tips with Lists:
        * `append()` method allows to add element to end of list
        * `index()` method returns first numeric location of a given value within a list
        * `len()` function returns the length of list
        * `remove()` method deletes a given value from a list
        * `pop()` method can be used to remove a value by index.  If do not specify index will remove last object in list.  
        
        * **PRO-TIP difference between Methods and Functions.  A method is a function which belongs to an object
    * Tuples are immutable where as Lists are mutable. Simply put a mutable object can be changed after it is created, and an immutable object can't.
    
* 10-Stu_RockPaperScissors  

    * Useful module `random` allows computer to make a choice randomly from a list of actions.  For more info [random](https://docs.python.org/3.6/library/random.html)
    
* 11-Ins_Loops  
    * Two major kinds of programming loops:
        * counting loops - in python can think of `for` statement which executes the loop body _for every_ item in some list.
        * event-controlled loops - the computer stops the execution when a condition is no longer true.  in python this is a `while` statement that executes the loop _while_ the condition is true.
        
* 12-Stu_NumberChain  


## Lesson 2: Reading, Writing, and Pyrithmetic
* Feel confident reading data into Python from CSV files.
* Feel confident writing data from Python into CSV files.
* Understand how to zip two lists together and know when this is helpful.
* Basic understanding of how to create and use Python functions.


### **Additional Resources**  

* **[Loop Control Statements](https://python-textbok.readthedocs.io/en/1.0/Loop_Control_Statements.html) good explanation**

* [Defining Your Path](https://medium.com/@ageitgey/python-3-quick-tip-the-easy-way-to-deal-with-file-paths-on-windows-mac-and-linux-11a072b58d5f)  **PRO-TIP**

* [With open()](https://www.geeksforgeeks.org/reading-writing-text-files-python/)

* [List of Built-In Python Modules](https://docs.python.org/3/py-modindex.html)  

* [Python Functions - Exercises, Practice, Solution](https://www.w3resource.com/python-exercises/python-functions-exercises.php)

* [Python in 24 Hours](https://www.amazon.com/Python-Hours-Sams-Teach-Yourself-ebook/dp/B00F4PSLYS/ref=sr_1_1?keywords=python+in+24+hours&qid=1567034452&s=gateway&sr=8-1)  


* 01-Stu_QuickCheckup  
    * Quick refresher on using `input()` function `print()` and simple conditional to check age
    
* 02-Ins_SimpleLoops  **--BASIC HOMEWORK--**
    * Two major kinds of programming loops:
        * `counting loops` - in python can think of `for` statement which executes the loop body _for every_ item in some list.
            * `For` loop will loop through a range of numbers, the letters, of a string or the elements within a list one at a time. 

        * `event-controlled loops` - the computer stops the execution when a condition is no longer true.  in python this is a `while` statement that executes the loop _while_ the condition is true.
            * `While` loop will loop through code contained inside of it until some condition is met.
            
* 03-Stu_KidInCandyStore
    * Practice with Loops 
    
* 04-Stu_HouseOfPies  
    * Practice with Loops
    
* 05-Ins_BasicRead **--BASIC HOMEWORK BUILDING BLOCK--**
    * **MOST IMPORTANT** when dealing with external files, Python requires very precise directions on what path to follow for desired file.  
    
        ```python
        # example setting path with Windows
        file = "Resources\\input.txt"
        
        # example setting pathin using Mac
        file = "Resources/input.txt"
        ```
       
       * Different operating systems use different paths to locate files.
            * Windows machines will often use forward slashes to separate folders 
            * Mac devices will use backslashes.
       *  **PRO TIP**  to avoid this nonsense see the standard library `pathlib` link is above
    
    * Steps to opening a file with Python:
        * `with` statement for as long as dealing with following block save the text variable.  Once block is completed text variable will be "cleaned up" and removed to save memory.
        * `open(<File Path>,<Read/Write>)` is function Python uses in order to open and work with external texts. File access modes:
        ![file_handle](images/handle.png)
    * `text.read()` module parses the data that is read in by the `open()` function and converts it into a string type. Allowing you to print contents of file

```python
# Additional Notes on need to find where you are here is a couple of short cuts  
!pwd
import os
os.getcwd()
```

* 06-Ins_Modules  
    * Python has hundreds of built in modules that will help you simplify your work.  Modules that are pre-packaged with Python just needed to be imported by calling 
    
    ```python
    #some of my favorite modules
    import collections #quick way for counting hashable objects
    import datetime #helps with date and time manipulation
    import re #Regular expression operations.
    import secrets #Generate secure random numbers for managing secrets.
    ```
* 07-Ins_ReadCSV  **--BASIC HOMEWORK BUILDING BLOCK--**
    * **Pro-Tip** to quickly find file encoding type, use file name.csv.  If you are in jupyter notebook use `!file name.csv`
    ![Encoding](images/encoding.png)
    * `CSV `stands for Comma Separated Values and is essentially a table that has been converted into text format with each row and column being separated by specified symbols.
    * Module we will use to open csv file is called ... `csv` allowing for users to easily pull in data from external csv files and perform operations on them.
        * Difference from open .txt file:
            * when calling `with open()` to read file in have included parameter `newline=''` tells python that each time the CSV file goes down a line it should be considered new row
            * `csv.reader()` to translate the object being opened by Python.  **Have to INCLUDE** `delimeter=','` parameter which tells python each comma within a CSV should be seen as moving into a new column for a row.
            
            ```python
            # import necessary modules
            import os # define path where file resides
            import csv # allows us to read in csv file
            
            # define path where file is located
            path = os.path.join('Resources','accounting.csv')
            
            # open csv file making sure to include `newline=''` parameter
            with open(path,newline='') as csvfile:
                
                # make sure to specify delimiter and variable that holds content
                csvreader = csv.reader(csvfile,delimiter=',')
                
                # to print / read each row use a for loop:
                for row in csvreader:
                    print(row)

            ```
* 08-Stu_ReadNetFlix  
    * More documentation on `break` statement [break statement](https://docs.python.org/3.6/reference/simple_stmts.html#break)

* 09-Ins_WriteCSV  **--BASIC HOMEWORK BUILDING BLOCK--**
    * `csv.writer()` is much like `csv.reader()` except it is used to write to a file.  Will need to pass `w` in parameter verse `r` in order to write to a file.  
    * in order to add a new row to a csv file would use `csv.writerow(<DATA LIST>)` and make sure to pass `a` in the data parameter of open.
    
    ```python
    import os
    import csv
    
    output_path = os.path.join('output','new.csv')
    
    with open(output_path,'w',newline='') as csvfile:
        csvwriter = csv.writer(csvfile,delimiter=',')
        
        # Write the first tow (column headers)
        csvwriter.writerow(['First Name','Last Name', 'SSN])
        
    ```
* 10-Ins_Zip  **--Important but not necessary to complete homework--**
   *  `zip()` function comes in handy when want to write data into a new CSV verse using `csv.writerow()`.  `zio()` takes a series of lists as its parameters and joins them together into a stack.  When using _zip()_ all arrays must be same length!
       * **Zipped listed are turned into iterator objects which are similar to tuples, but once they are iterated over they are empty. This means each zipped object can only be used once. For example, you can write the zipped object to a CSV or print to the terminal, but not both.**
    
* 11-Stu_UdemyZip  

* 12-Ins_Functions  **--Important but up to you if use with HOMEWORK--**
    * **Don't Repeat Yourself** see link above called _Python Functions - Exercises, Practice, Solution_ good opportunity to practice.
    
       * Function is block of organized, reusable code that is used to perform a single related action.  Functions are placeable blocks of code that perform a specific actions.
       * to create a function use `def <Function Name>():` and then place the code you would like to run within the block underneath.
       * Functions that take in parameters can also be created by simply adding a variable into the parentheses of the function's definition. This allows specific data to be passed into the function for usage.
 

```python
def printHello():
    return "Hello! "

def printName(hello,name):
    print(hello + name + "!")

printName(printHello(),"Guy Mrnustik")
```

## Lesson 3: Python Deeper Dive
* Be able to add, commit, and push code up to GitHub from the command line.  **YOU ALREADY KNOW THIS**
* Be able to create and use Python dictionaries.
* Be able to read data in from a dictionary.
* Be able to use list comprehensions.
* Be able to write and re use Python function.
* Firm understanding of coding logic and reasoning.

* Make sure to check out [Extra Content Folder](https://smu.bootcampcontent.com/SMU-Coding-Bootcamp/SMU-DAL-DATA-PT-08-2019-U-C/tree/master/01-Lesson-Plans/03-Python/3/Extra_Content) some awesome exercises for when you have time


### **Additional Resources**  

* [__main__ — Top-level script environment](https://docs.python.org/3/library/__main__.html)

* [Python 24 Hours](https://www.amazon.com/Sams-Teach-Yourself-Python-Hours/dp/0672336871/ref=sr_1_3?keywords=python+24+hours&qid=1567541710&s=gateway&sr=8-3)   **good book on explanation of functions, classes, etc**

* [next function](https://www.w3schools.com/python/ref_func_next.asp)  

* [Free Training Dictionaries](https://www.learnpython.org/en/Dictionaries)

* [List Comprehension Tutorial](https://www.learnpython.org/en/List_Comprehensions)  

* [DRY - Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)  

* 


* 01-Stu_CerealCleaner  
    * work with modules `csv` and `os`.  will also use `next` , `open`, `float` functions.  Along with looping through csv
* 02-Ins_Dicts  **--HOMEWORK--**
    * `Dict` data type can contain multiple values and types of data within them.  MAIN DIFFERENCE IS dictionaries contain `Key:Value` pairs.  A `key` is a string that can be referenced in order to collect the `value/values` associated with it.

    ```python
    # how to create a dictionary object
    # key is stored as a string example "name" followed by a colon :
    # value is placed after the : in below example value is "Tom Cruise"
    actor = {"name":"Tom Cruise"}

    # can access values within a dictionary by calling object followed by brackets and key name
    print(actor["name"])
    ```
    * Dictionaries can hold multiple pieces of information by following up key-value pairing with a comma and then place a key-value pair after it

    ```python
    # multiple pairings of key-value dictionary
    actress = {"name":"Angelina Jolie","genre":"Action","nationality":"United States"}
    ```
    * Dictionaries can store lists and dictionaries can store other dictionaries

    ```python
    # dictionary containing lists
    another_actor = {
    "name": "Sylvester Stallone",
    "age": 62,
    "married": True,
    "best movies": [
        "Rocky",
        "Rocky 2",
        "Rocky 3"]}
    
    print(f'{another_actor["name"]} was in {another_actor["best movies"][0]}')
    # dictionary containing another dictionary
    film = {
    "title": "Interstellar",
    "revenues": {
        "United States": 360,
        "China": 250,
        "United Kingdom": 73
        }
    }
    print(f'{film["title"]} made {film["revenues"]["United States"]}'" in the US.")
    ```
* 03-Stu_HobbyBook  **--HOMEWORK--**
* 04-Evr_List_Comprehensions  
    * `list comprehension` powerful tool, which creates a new list based on another list, in a single, readable line.

    ```python
    # for statement to iterate through a list and perform some action on an element. example to capitalize each letter in a word
    word = "trout"
    capital_letters = []
    for letter in word:
        capital_letters.append(letter.upper())
        
    # same result just using a list comprehension
    capital_letters = [letter.upper() for letter in word]
    ```
    
* 05-Stu_List_Comprehensions  **-- DO NOT NEED FOR HOMEWORK BUT CAN TRY AND INCORPORATE IF WANT--**
* 06-Evr_Functions  
    * to define a function use the keyword of `def` then use some name for the function `foo` followed by parentheses which are an optional addtional parameters/arguments.  A `parameter` is the name of a variable in a function while an `argument` is the value that you pass to the parameter. At end of function call include : 
    * Functions are a way to give a name to a set of instructions that you want to be able to repeat. 

    ```python
    # show is function 
    # message is the attribute
    # function will print whatever argument is added to the function functionName()
    def functionName(arg1):
        
        #function body
        
        print(arg1)
        
    # in order to run the function will have to call the function functioName("Hello, World!")
    functionName("Hello World!")
    ```
    
    * Calling a function is a synonym for running it.  So when it is said you call a function, it simply means that your are running / executing it.
    * 3 Primary types of functions (you look up):
        1. Built-in Functions
        2. User-defined Functions
        3. Anonymous Functions
        
* 07-Stu_Functions  **-- DO NOT NEED FOR HOMEWORK BUT CAN TRY AND INCORPORATE IF WANT--**
* 08-Par_WrestlingWithFunctions  


# Unit 3 | Assignment - Py Me Up, Charlie

## Background

Well... you've made it!

It's time to put away the Excel sheet and join the big leagues. Welcome to the world of programming with Python. In this homework assignment, you'll be using the concepts you've learned to complete **2** Python Challenges, PyBank and PyPoll.
Both of these challenges encompasses a real-world situation where your newfound Python scripting skills can come in handy. These challenges are far from easy so expect some hard work ahead!

### Before You Begin

1. Create a new repository for this project called `python-challenge`. **Do not add this homework to an existing repository**.

2. Clone the new repository to your computer.

3. Inside your local git repository, create a directory for both of the  Python Challenges. Use folder names corresponding to the challenges: **PyBank** and  **PyPoll**.

4. Inside of each folder that you just created, add a new file called `main.py`. This will be the main script to run for each analysis.

5. Push the above changes to GitHub or GitLab.

## PyBank

![Revenue](Images/revenue-per-lead.png)

* In this challenge, you are tasked with creating a Python script for analyzing the financial records of your company. You will give a set of financial data called [budget_data.csv](PyBank/Resources/budget_data.csv). The dataset is composed of two columns: `Date` and `Profit/Losses`. (Thankfully, your company has rather lax standards for accounting so the records are simple.)

* Your task is to create a Python script that analyzes the records to calculate each of the following:

  * The total number of months included in the dataset

  * The net total amount of "Profit/Losses" over the entire period

  * The average of the changes in "Profit/Losses" over the entire period

  * The greatest increase in profits (date and amount) over the entire period

  * The greatest decrease in losses (date and amount) over the entire period

* As an example, your analysis should look similar to the one below:

  ```text
  Financial Analysis
  ----------------------------
  Total Months: 86
  Total: $38382578
  Average  Change: $-2315.12
  Greatest Increase in Profits: Feb-2012 ($1926159)
  Greatest Decrease in Profits: Sep-2013 ($-2196167)
  ```

* In addition, your final script should both print the analysis to the terminal and export a text file with the results.

## PyPoll

![Vote-Counting](Images/Vote_counting.png)

* In this challenge, you are tasked with helping a small, rural town modernize its vote-counting process. (Up until now, Uncle Cleetus had been trustfully tallying them one-by-one, but unfortunately, his concentration isn't what it used to be.)

* You will be give a set of poll data called [election_data.csv](PyPoll/Resources/election_data.csv). The dataset is composed of three columns: `Voter ID`, `County`, and `Candidate`. Your task is to create a Python script that analyzes the votes and calculates each of the following:

  * The total number of votes cast

  * A complete list of candidates who received votes

  * The percentage of votes each candidate won

  * The total number of votes each candidate won

  * The winner of the election based on popular vote.

* As an example, your analysis should look similar to the one below:

  ```text
  Election Results
  -------------------------
  Total Votes: 3521001
  -------------------------
  Khan: 63.000% (2218231)
  Correy: 20.000% (704200)
  Li: 14.000% (492940)
  O'Tooley: 3.000% (105630)
  -------------------------
  Winner: Khan
  -------------------------
  ```

* In addition, your final script should both print the analysis to the terminal and export a text file with the results.

## Hints and Considerations

* Consider what we've learned so far. To date, we've learned how to import modules like `csv`; to read and write files in various formats; to store contents in variables, lists, and dictionaries; to iterate through basic data structures; and to debug along the way. Using what we've learned, try to break down you tasks into discrete mini-objectives. This will be a _much_ better course of action than attempting to Google Search for a miracle.

* As you will discover, for some of these challenges, the datasets are quite large. This was done purposefully, as it showcases one of the limits of Excel-based analysis. While our first instinct, as data analysts, is often to head straight into Excel, creating scripts in Python can provide us with more robust options for handling "big data".

* Your scripts should work for each dataset provided. Run your script for each dataset separately to make sure that the code works for different data.

* Feel encouraged to work in groups, but don't shortchange yourself by copying someone else's work. You get what you put in, and the art of programming is extremely unforgiving to moochers. Dig your heels in, burn the night oil, and learn this while you can! These are skills that will pay dividends in your future career.

* Start early, and reach out for help often! Challenge yourself to identify _specific_ questions for your instructors and TAs. Don't resign yourself to simply saying, "I'm totally lost." Come prepared to show your effort and thought patterns, we'll be happy to help along the way.

* Always commit your work and back it up with GitHub pushes. You don't want to lose hours of your work because you didn't push it to GitHub every half hour or so.

  * **Commit often**.

## Copyright

Trilogy Education Services © 2019. All Rights Reserved.

```python

```
