import React, { useState, Component, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

// import video from "../assets/img/blockchain.mp4";
import Button from "../../component/Button";
import SubSection from "../../component/SubSection";
import Alert from "../../component/Alert";
import InlineInput from "../../component/InlineInputs";
import SnackBar from "../../component/SnackBar";
import Dialog from "../../component/FormDialog";

import PublishIcon from "@material-ui/icons/Publish";
import SendIcon from "@material-ui/icons/Send";
//-------------------------------------------------

//-----------------------------------------------
import Web3 from "web3";
import Infrachain from "../../abis/Infrachain.json";
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values
//------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "16px",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  control: {
    padding: theme.spacing(2),
  },
  div: {
    position: "fixed",
    top: "100px",
    left: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "blue",
    width: "100%",
  },
  inputDiv: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: "2em",
    fontWeight: "500",

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SubComponent({ row }) {
  const classes = useStyles();
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState(false);
  const [echec, setEchec] = useState(false);
  const [loading, setLoading] = useState(false);

  //-----------------------------------------
  const [buffer, setBuffer] = useState(false);
  // const [hash, setHash] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  let etat = success || echec;

  //let msgSuccess = `Le document ${fileName} est cértifier. Un mail est envoyé à ${row.original.Email}`;
  let msgSuccess = `Le document ${fileName} est cértifier dans la blockChain et envoyer à l'email ${row.original.Email}`;
  useEffect(() => {
    loadWeb3();
    loadBlockchainContract();
    // console.log('date',getCurrentDate())
  }, []);

  // initialiser Web3
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  //connect to blockchain ganache
  async function loadBlockchainContract() {
    const web3 = window.web3;
    // Load cuurent account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    //Infrachain.json : get networks after truffle migration
    const networkData = Infrachain.networks[networkId];
    if (networkData) {
      const contract = web3.eth.Contract(Infrachain.abi, networkData.address);
      //add Contract to State
      setContract(contract);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  //----------------------------------- 1- capture file and convert it to Array Buffer
  const captureFile = (event) => {
    event.preventDefault();
    //get file
    const file = event.target.files[0];
    setFileName(file.name);
    if (!fileName) setEchec(false);
    //convert file to buffer Reader
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      //Buffer in a state
      setBuffer(Buffer(reader.result));
    };
  };
  //----------------------------------- 2- click on submit button
  const onSubmit = (event) => {
    setOpen(true);
  };
  //----------------------------------3- after confirmation , send buffer to IPFS Server
  const handleDialogAction = (event) => {
    setLoading(true);
    ipfs
      .add(buffer)
      .then((res) => {
        console.log("HASH", res.path);
        // get Hash from ipfs
        //setHash(res.path);
        // send Hash + extra informations to blockchain
        sendDoc2BC(res.path);
        setLoading(false);
      })
      .catch((err) => {
        setSuccess(false);
        setEchec(true);
        setFileName("");
        setLoading(false);
      });
  };
  // ------------------------------------4- send hash + exta information to blockchain
  function getCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return date < 10
      ? "0" + date
      : date + "/" + month < 10
      ? "0" + month
      : month + "/" + year;
  }
  const sendDoc2BC = async (hash) => {
    let dateCreation = getCurrentDate();
    const docHash = hash;
    const emailOwner = row.original.Email;
    const name = row.original.Nom + " " + row.original.Prenom;

    const certifiedBy = "ENSIAS SCOLARITE";

    // addDOC is a function in contract

    contract.methods
      .addDoc(hash, emailOwner, name, dateCreation, certifiedBy)
      .send({ from: account })
      .then((r) => {})
      .catch((err) => {
        setMessage("Vous avez annuler la certification du document");
        setSuccess(false);
        setEchec(true);
      });
    var doc;
    do {
      doc = await contract.methods.Docs(hash).call();
      if (doc[1].length > 0) {
        // open message de confirmation
        setSuccess(true);
        setEchec(false);
        sendEmail(docHash, emailOwner);
      }
    } while (doc[1].length === 0 && !etat);
  };
  const sendEmail = (docHash, emailOwner) => {
    const templateId = "template_EnsiasScolarite";
    sendEmailJS(templateId, {
      hashDoc: docHash,
      lien: `https://ipfs.infura.io/ipfs/${docHash}`,
      reply_to: emailOwner,
    });
  };
  function sendEmailJS(templateId, variables) {
    window.emailjs
      .send("service_Scola", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }
  return (
    <Container maxWidth="md">
      {open && (
        <Dialog
          title="Validation"
          content="Vérifier les informations avant de valider"
          open={open}
          setOpen={setOpen}
          handleAction={handleDialogAction}
        >
          {" "}
          <Typography variant="overline" display="block" gutterBottom>
            Cértifiez le document{" "}
            <span style={{ fontWeight: "bold" }}>{fileName}</span>{" "}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            Envoyez le document à{" "}
            <span style={{ fontWeight: "bold" }}>{row.original.Email}</span>{" "}
          </Typography>
        </Dialog>
      )}
      {success && (
        <SnackBar show={success} type="success" message={msgSuccess} />
      )}

      <SubSection>
        <Typography align="left" className={classes.title}>
          Cértifier et Envoyer{" "}
          <span style={{ color: "#4287f5" }}>un document</span>
        </Typography>

        <InlineInput>
          <TextField
            variant="outlined"
            placeholder="Vérifier un document"
            fullWidth
            size="small"
            value={fileName}
            disabled
          />
          <input
            accept="application/pdf"
            id={row.original.Email}
            multiple
            hidden
            type="file"
            onChange={captureFile}
          />
          <label htmlFor={row.original.Email}>
            <Button component="span" className={classes.inputBtn}>
              <PublishIcon />
            </Button>
          </label>
          <div className={classes.wrapper}>
            <Button
              color={loading || fileName === "" ? "#efefef" : "#4cb69f"}
              onClick={onSubmit}
              className={classes.inputBtn}
              disabled={loading || fileName === ""}
            >
              <SendIcon />
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </InlineInput>
        <div className={classes.margin}>
          {echec && <Alert type={"error"} message={message} />}
        </div>
      </SubSection>
    </Container>
  );
}
