import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Mbutton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// import video from "../assets/img/blockchain.mp4";
import Section from "../component/Section";
import Button from "../component/Button";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import SubSection from "../component/SubSection";
import Info from "../component/Info";
import Alert from "../component/Alert";
import InlineInput from "../component/InlineInputs";

import { Link } from "react-router-dom";
import file from "../assets/img/file.svg";

import PublishIcon from "@material-ui/icons/Publish";
import SendIcon from "@material-ui/icons/Send";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import GetAppIcon from "@material-ui/icons/GetApp";

//-----------------------------------------------
import Web3 from "web3";
import { logout, isLogin } from "../routes/utils";
import Infrachain from "../abis/Infrachain.json";
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values
//------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
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

export default function Verification() {
  const classes = useStyles();
  const [fileName, setFileName] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [echec, setEchec] = useState(false);
  const [hashStatut, setHashStatut] = useState(false);
  //-------------------------------------------------
  // const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [buffer, setBuffer] = useState(false);
  const [infoDoc, setInfoDoc] = useState(false);

  //----------------------------------------------
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // initialiser Web3
  async function loadWeb3() {
    if (window.ethereum) {
      console.log("window.ethereum");
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      console.log("window.web3");
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  //connect to blockchain ganache
  async function loadBlockchainData() {
    loadWeb3();
    const web3 = window.web3;
    // Load cuurent account
    // const accounts = await web3.eth.getAccounts();
    // setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    // console.log("networkId", networkId);
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
  //------------------------------------------------
  //----------------------------------- 1- capture file and convert it to Array Buffer
  const captureFile = (event) => {
    event.preventDefault();
    setEchec(false);
    setSuccess(false);
    //get file
    const file = event.target.files[0];
    setFileName(file.name);
    if (!fileName) setEchec(false);
    //convert file to buffer Reader
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      //Buffer in a state
      console.log("Buffer", Buffer(reader.result));
      setBuffer(Buffer(reader.result));
    };
  };

  let etat = success || echec;

  const listItems = [{ href: "/verification", text: "Verifier" }];

  const handleClick = () => {
    setLoading(true);
    //send it to ipfs

    ipfs.add(buffer).then((res) => {
      // console.log("hash handleClick", res.path);
      setFileHash(res.path);
      //check in blockchain
      checkHash(res.path);
    });
  };
  //"QmdQ7j9VQmX9CnUfkfUMv7KMZq1wr4Bj4sh1A2jpsubHnk"
  const checkHash = async (hash) => {
    const doc = await contract.methods.Docs(hash).call();
    if (doc[1].length > 0) {
      setInfoDoc({
        Hash: doc[0],
        Certifié_Par: doc[4],
        Nom_du_propriétaire: doc[2],
        Email_du_propriétaire: doc[1],
        Date_de_création: doc[3],
      });
      setSuccess(true);
      setEchec(false);
      //-------------------------------- POSTVERIFICATION
    } else {
      setSuccess(false);
      setEchec(true);
    }
    setLoading(false);

    //const lien=`https://ipfs.infura.io/ipfs/${doc.docHash}`
    //console.log('download document',lien);
    /*fetch(`https://ipfs.infura.io/ipfs/${hash}`)
      .then(res=>{
        console.log('res',res);
      })*/
  };
  // const downloadDoc = () => {
  //   const lien = `https://ipfs.infura.io/ipfs/${fileHash}`;
  // };

  const handleClickHash = () => {
    checkHash(fileHash);
  };
  // function postVerification() {
  //   setMessage("Le hash est valide . Vous pouvez télécharger le document");
  //   if (fileHash) setSuccess(true);
  //   else {
  //     setEchec(true);
  //     setSuccess(false);
  //     setMessage("Vous devez choisir un document");
  //   }
  // }
  let lien = `https://ipfs.infura.io/ipfs/${fileHash}`;
  let blank = "_blank";

  const changeVerification = () => {
    setHashStatut(!hashStatut);
    setFileName("");
    setFileHash("");
    setLoading(false);
    setSuccess(false);
    setEchec(false);
  };
  const list = [
    !hashStatut
      ? "Ajoutez un document depuis votre ordinateur"
      : "Saisisez le hash du document à vérifié",
    "Cliquez sur le bouton envoyer pour vérifier si le document est valide",
    "Le résultat va s'afficher sur la même page",
    "Si le document est valide vous pouvez le télécharger",
  ];

  return (
    <React.Fragment>
      <Navbar listItems={listItems}>
        {" "}
        {isLogin() ? (
          <Link to="/">
            <Button onClick={logout}>Deconnexion</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>Certifer</Button>
          </Link>
        )}
      </Navbar>
      <CssBaseline />

      <Container className={classes.root}>
        <div
          style={{
            position: "sticky",
            top: "100px",
            zIndex: 15,
            padding: "8px 0",
          }}
        >
          <Info titre="Comment verifier un document ?" list={list} />
          <Mbutton
            startIcon={<SwapHorizIcon />}
            variant="outlined"
            onClick={changeVerification}
            color="primary"
            style={{ background: "#fff" }}
          >
            {hashStatut ? "Vérifier par document" : "Vérifier par Hash"}
          </Mbutton>
        </div>
        <Section style={{ minHeight: "auto" }}>
          <SubSection center>
            <img src={file} alt="file" style={{ width: "80%" }}></img>
          </SubSection>
          <SubSection center>
            <Typography align="left" className={classes.title}>
              {"Vérifier par "}
              <span style={{ color: "#4287f5" }}>
                {hashStatut ? "HASH" : "DOCUMENT"}
              </span>
            </Typography>

            {!hashStatut ? (
              <InlineInput>
                <TextField
                  id="doc"
                  variant="outlined"
                  placeholder="Choisir un document"
                  fullWidth
                  size="small"
                  value={fileName}
                  disabled
                />
                <input
                  accept="application/pdf"
                  id="fileInput"
                  multiple
                  hidden
                  type="file"
                  onChange={captureFile}
                />
                <label htmlFor="fileInput">
                  <Button component="span" className={classes.inputBtn}>
                    <PublishIcon />
                  </Button>
                </label>
                <div className={classes.wrapper}>
                  <Button
                    color={loading || fileName === "" ? "#efefef" : "#4cb69f"}
                    onClick={handleClick}
                    className={classes.inputBtn}
                    disabled={loading || fileName === ""}
                  >
                    <SendIcon />
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </InlineInput>
            ) : (
              <InlineInput>
                <TextField
                  id="hash"
                  variant="outlined"
                  placeholder="Saisir un hash"
                  fullWidth
                  size="small"
                  value={fileHash}
                  onChange={(e) => {
                    setFileHash(e.target.value);
                    setEchec(false);
                    setSuccess(false);
                  }}
                />

                <div className={classes.wrapper}>
                  <Button
                    color={loading || fileHash === "" ? "#efefef" : "#4cb69f"}
                    onClick={handleClickHash}
                    className={classes.inputBtn}
                    disabled={loading || fileHash === ""}
                  >
                    <SendIcon />
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </InlineInput>
            )}

            {success && (
              <a href={lien} target={blank}>
                <Button className={classes.inputBtn} startIcon={<GetAppIcon />}>
                  {"Télécharger le document"}
                </Button>
              </a>
            )}

            <div className={classes.margin}>
              {etat && (
                <Alert
                  type={success ? "success" : "error"}
                  title={success ? "Document valide" : "Document non valide"}
                  message={
                    success ? infoDoc : hashStatut ? null : { Hash: fileHash }
                  }
                />
              )}
            </div>
          </SubSection>
        </Section>
      </Container>
      <Footer text="Copyright © ENSIAS" />
    </React.Fragment>
  );
}
