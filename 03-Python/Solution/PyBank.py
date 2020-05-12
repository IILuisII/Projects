import csv

# Path
FilePath = r"C:\Users\Maxi\Desktop\smu-homework\03-Python\Solution\budget_data.csv" #Couldn't get relative path.

#Function
def PL_Bank(data):

    # Variables
    Months_Amount = 0
    Profit = 0
    Months = []
    Total_Profit = 0
    Difference = 0
    Total_Difference = []


    
    # Loop
    for row in data:
       
        # + 1
        Months_Amount += 1
        
        # Total_Profit total
        Total_Profit += int(row[1])
        
        # Months total
        Months.append(str(row[0]))
        
        if Difference != 0:
            
            # First Profit 
            Profit = int(row[1])
            
            # Difderence, new vs old
            Difference = Profit - Difference
            
            # Store Difference 
            Total_Difference.append(Difference)
            
            # Reset
            Difference = int(row[1])
            
        # Else value = 0
        elif Difference == 0:
            Difference = int(row[1])  
            
    # No Difference first month
    Months.pop(0)
    
    # Find Greatest Increase and
    Greatest_Increase = Total_Difference.index(max(Total_Difference))
    Greatest_Decrease = Total_Difference.index(min(Total_Difference))

    # Find Months
    Increase_Difference = (Months[int(Greatest_Increase)], max(Total_Difference))
    Decrease_Difference = (Months[int(Greatest_Decrease)], min(Total_Difference))
    
    # Find mean of total difference
    Mean = sum(Total_Difference)/float(len(Total_Difference))
    Mean = round(Mean,2)
    
    # print the results
    print(f'Financial Analysis')
    print(f'-------------------------------------------')
    print(f'Total Months: {Months_Amount}')
    print(f'Net Profit: {Total_Profit}')
    print(f'Average Monthly Change: {Mean}')
    print(f'Greatest Increase in Profits: {Increase_Difference}')
    print(f'Greatest Loss In Profits: {Decrease_Difference}')

    # Text Path
    PyBanktxt = r"C:\Users\Maxi\Desktop\smu-homework\03-Python\Solution\ResultsPyBank.txt"
    
    # Text
    with open(PyBanktxt, 'w') as txtfile:
        txtfile.write('Financial Analysis')
        txtfile.write('\n------------------------------------')
        txtfile.write(f'\nTotal Months: {Months_Amount}')
        txtfile.write(f'\nNet Profit: {Total_Profit}')
        txtfile.write(f'\nAverage Monthly Change: {Mean}')
        txtfile.write(f'\nGreatest Increase In Profits: {Increase_Difference}')
        txtfile.write(f'\nGreatest Loss In Profits: {Decrease_Difference}')

# CSV 
with open(FilePath, 'r', newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    # Heather
    csv_header = next(csvfile)
    PL_Bank(csvreader)