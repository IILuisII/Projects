import csv

# Filepath
Filepath = r"C:\Users\Maxi\Desktop\smu-homework\03-Python\Solution\election_data.csv"

# Function
def Poll(data):

    # Variables
    TotalVotes = 0
    Votes = []
    Candidates = []
    Unique_Candidates = []
    Total_Percent = []
     
    # Loop
    for row in data:

        # Sum Votes
        TotalVotes += 1

        # Append Candidates
        if row[2] not in Unique_Candidates:
            Unique_Candidates.append(row[2])

        # New List
        Votes.append(row[2])

    # Loop
    for candidate in Unique_Candidates:
        Candidates.append(Votes.count(candidate))
        Total_Percent.append(round(Votes.count(candidate)/TotalVotes*100,3))

    # Most Votes
    Winner = Unique_Candidates[Candidates.index(max(Candidates))]
    
    # Print
    print('Election Results')
    print('--------------------------------')
    print(f'Total Votes: {TotalVotes}')
    print('--------------------------------')
    for p in range(len(Unique_Candidates)):
        print(f'{Unique_Candidates[p]}: {Total_Percent[p]}% {Candidates[p]}')
    print('--------------------------------')
    print(f'Winner: {Winner}')
    print('--------------------------------')

    # Text Path
    PyPolltxt = r"C:\Users\Maxi\Desktop\smu-homework\03-Python\Solution\ResultsPyPoll.txt"

    # Text
    with open(PyPolltxt, "w") as txtfile:
        txtfile.write('Election Results')
        txtfile.write('\n------------------------------------')
        txtfile.write(f'\nTotal Votes: {TotalVotes}')
        txtfile.write('\n------------------------------------')
        for p in range (len(Unique_Candidates)):
            txtfile.write(f'\n{Unique_Candidates[p]}: {Total_Percent[p]}% {Candidates[p]}')
        txtfile.write('\n------------------------------------')
        txtfile.write(f'\nWinner: {Winner}')
        txtfile.write('\n------------------------------------')


# CSV
with open(Filepath, newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    # Header
    csv_header = next(csvfile)
    Poll(csvreader)