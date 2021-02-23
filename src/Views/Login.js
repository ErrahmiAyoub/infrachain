import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { Formik, Form, Field } from "formik";
import OutlinedTextField from "../component/OutlinedInput";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import { signIn } from "../routes/utils";
import Alert from "../component/Alert";
import { object, string } from "yup";
import { useHistory } from "react-router-dom";

import logo from "../assets/img/logoH.png";
import { FlashOnRounded } from "@material-ui/icons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://ensias.um5s.ac.ma/">
        ENSIAS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    height: "25vh",
  },
}));

const signInShcema = object().shape({
  email: string().email("Format d'email invalid").required("Email obligatoire"),
  password: string().required("Mot de passe obligatoire"),
});

export default function SignIn() {
  const TOKEN_KEY = "jwt";
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <CssBaseline />
      <a href="./">
        <img className={classes.img} src={logo} alt="logoChu" />
      </a>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Se connecter
      </Typography>
      {error && (
        <Alert
          type="error"
          message="L’email ou le mot de passe entrés ne correspond à aucun compte"
        />
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInShcema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            // signIn(values.email, values.password, setError);
            if (
              values.email === "ensias@gmail.com" &&
              values.password === "azerty"
            ) {
              setError(false);
              localStorage.setItem(TOKEN_KEY, values.email);
              history.push("/home");
            } else setError(true);
          });
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={OutlinedTextField}
              type="text"
              label="Email"
              name="email"
            />

            <Field
              component={OutlinedTextField}
              autoComplete="off"
              type="password"
              label="Mot de passe"
              name="password"
            />
            <Button
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitForm}
            >
              S'authentifier
            </Button>
          </Form>
        )}
      </Formik>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
