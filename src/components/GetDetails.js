import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Image,
  Divider,
  Container
} from "semantic-ui-react";
import web3 from "./web3";
import factory from "./factory";

class GetDetails extends React.Component {
  state = {
    hash: "",
    loading: false,
    errors:[],
    coinName:"",
    coinType:"",
    creationTime:"",
    details: false,
    message: "",
    messageVisible: false
  };

  async componentDidMount() {
    //   const coin = CryptographicCurrency();
    const details = await factory.methods.owner().call();
    const hashed = await factory.methods.checkCoinInfo('0x317eca4892944eebb5baac4f2634a8fa99958d59c5c05c5a98003b49f9b5e09e').call();
    console.log(details);       
    console.log(hashed);       
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({loading: true});
    try{
        const hashed = await factory.methods.checkCoinInfo(this.state.hash).call();
        const date = new Date(hashed[3] * 1000).toString()
        this.setState({coinName: hashed[1], 
            coinType: hashed[2], creationTime: date, 
            details: true, loading: false,
            messageVisible: false});
        console.log(this.state.creationTime);
    } catch(err) {
        console.log(err);
        this.setState({message: "Please enter valid Cryptographic hash",
        messageVisible: true, loading: false, details: false
        });
    }

  }

//   displayErrors = (errors) =>
//     errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     if (this.isFormValid(this.state)) {
//       this.setState({ errors: [], loading: true });
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(this.state.email, this.state.password)
//         .then(signedInUser => {
//             console.log(signedInUser);
//             this.setState({loading: false})
//         })
//         .catch(err => {
//             console.error(err);
//             this.setState({
//                 errors: this.state.errors.concat(err),
//                 loading: false
//             });
//         });
      
//     }
//   };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const {
      hash,
      loading
    } = this.state; //to use for value

    console.log(hash);

    return (
    
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>

          <Header as="h1" icon color="yellow" textAlign="center">

            Cryptographic Coins Hash Details
          </Header>
          <Form size="large">
            <Segment stacked>

              <Form.Input
                fluid
                name="hash"
                icon="dot circle"
                iconPosition="left"
                placeholder="Enter Coin Hash"
                onChange={this.handleChange}
                value={hash}
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
                onClick={this.onSubmit}
              >
                Get Details
              </Button>
            </Segment>
          </Form>

          <Message 
            style={{display: this.state.details ? "block" : "none"}}
            header="Cryptographic currency details"
            list={[
                `Coin Name - ${this.state.coinName}`,

                `Coin Type - ${this.state.coinType}`,
                
                `Creation Time - ${this.state.creationTime}`
            ]}
          />

          <Message error style={{display: this.state.messageVisible ? "block" : "none"}}>
            {this.state.message}
          </Message>

          <Message>
            Don't have a Cryptographic Currency yet? <a href="https://opensea.io/collection/cryptographiccoins">Get yours here</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default GetDetails;


// https://i.ibb.co/WVcv2Dd/banner2.png