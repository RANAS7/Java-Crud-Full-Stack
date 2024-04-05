import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

interface Student {
  id: number;
  name: string;
  email_id: string;
}

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email_id, setEmailId] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const classes = useStyles();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/student/getAll");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setStudents(result);
      console.log("Data fetched successfully:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    const student = { name, email_id };

    try {
      await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      alert("Student added successfully");
      console.log(student);
      setName(""); // Clear the input fields after successful submission
      setEmailId("");
      fetchData(); // Fetch data again to update the student list
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data when the component mounts
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Student</u>
        </h1>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleClick}
        >
          <TextField
            id="name"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="email_id"
            label="Student Email"
            variant="outlined"
            fullWidth
            value={email_id}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
      <h1>Students</h1>

      <Paper elevation={3} style={paperStyle}>
        {students &&
          students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              key={student.id}
            >
              Id: {student.id}
              <br />
              Name: {student.name}
              <br />
              Email: {student.email_id}
            </Paper>
          ))}
      </Paper>
    </Container>
  );
}
