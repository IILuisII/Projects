--- List the following details of each employee: employee number, last name, first name, sex, and salary.
SELECT 
	e.emp_no, 
	e.last_name, 
	e.first_name, 
	e.sex, 
	s.salary
FROM 
	employees e
JOIN 
	salaries s ON s.emp_no = e.emp_no;

--- List first name, last name, and hire date for employees who were hired in 1986.
SELECT 
	first_name, 
	last_name, 
	hire_date 
FROM 
	employees
WHERE 
hire_date BETWEEN '1986-01-01' AND '1987-01-01';

--- List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name.
SELECT 
	d.dept_no, 
	d.dept_name, 
	dm.emp_no, 
	e.last_name, 
	e.first_name
FROM 
	departments d
JOIN dept_manager dm ON dm.dept_no = d.dept_no
JOIN employees e ON dm.emp_no = e.emp_no;

--- List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT 
	dm.emp_no, 
	e.last_name, 
	e.first_name, 
	d.dept_name
FROM 
	dept_emp dm
JOIN employees e ON e.emp_no = dm.emp_no
JOIN departments d ON d.dept_no = dm.dept_no;

--- List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT 
	first_name, 
	last_name, 
	sex
FROM 
	employees
WHERE 
	first_name = 'Hercules'
AND 
	last_name LIKE 'B%';

--- List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT 
	dm.emp_no, 
	e.last_name, 
	e.first_name, 
	d.dept_name
FROM 
	dept_emp dm
JOIN employees e ON e.emp_no = dm.emp_no
JOIN departments d ON d.dept_no = dm.dept_no
WHERE 
	d.dept_name = 'Sales';

--- List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT 
	dm.emp_no, 
	e.last_name, 
	e.first_name, 
	d.dept_name
FROM 
	dept_emp dm
JOIN employees e ON e.emp_no = dm.emp_no
JOIN departments d ON d.dept_no = dm.dept_no
WHERE 
	d.dept_name = 'Sales' 
OR 
	d.dept_name = 'Development';

--- In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT 
	last_name,
	COUNT(last_name) AS "Frequency"
FROM 
	employees
GROUP BY 
	last_name
ORDER BY
	COUNT(last_name) DESC;
	

CREATE USER readonly WITH PASSWORD 'password';
GRANT CONNECT ON DATABASE postgres TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;