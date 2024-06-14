import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { PageTitle } from "../../components/PageTitle";
import { useContext, useState } from "react";
import { StateContext } from "../../contexts/contexts";
import { useResource } from "react-request-hook";

export default function PersonalDetailsPage() {
  const { state } = useContext(StateContext);
  const { user } = state;
  const { patients } = state;
  console.log("Hello patients here: ", state.patients);

  const [mobile, setMobile] = useState(patients[0].phoneNumbers.mobile);
  const [home, setHome] = useState(patients[0].phoneNumbers.home);
  const [streetAddress, setStreetAddress] = useState(
    patients[0].address.street || ""
  );
  const [addressLine2, setAddressLine2] = useState(
    patients[0].address.line2 || ""
  );
  const [townCity, setTownCity] = useState(patients[0].address.townCity || "");
  const [postCode, setPostCode] = useState(patients[0].address.postCode || "");
  const [emailConsentChange, setEmailConsent] = useState(
    patients[0].consent.email
  );
  const [smsConsentChange, setSmsConsent] = useState(patients[0].consent.sms);
  const [nextOfKinConsentChange, setNextOfKinConsent] = useState(
    patients[0].consent.nextOfKin
  );

  const name =
    patients[0].title + " " + patients[0].firstName + " " + patients[0].surname;

  const navigate = useNavigate();

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleHomeChange = (event) => {
    setHome(event.target.value);
  };

  const handleStreetAddressChange = (event) => {
    setStreetAddress(event.target.value);
  };

  const handleAddressLine2Change = (event) => {
    setAddressLine2(event.target.value);
  };

  const handleTownCityChange = (event) => {
    setTownCity(event.target.value);
  };

  const handlePostCodeChange = (event) => {
    setPostCode(event.target.value);
  };

  const handleEmailConsentChange = (event) => {
    setEmailConsent(event.target.checked);
  };

  const handleSmsConsentChange = (event) => {
    setSmsConsent(event.target.checked);
  };

  const handleNextOfKinConsentChange = (event) => {
    setNextOfKinConsent(event.target.checked);
  };

  function handleBack(event) {
    navigate("/patient/menu");
  }

  const [_, save] = useResource(() => ({
    url: "patient/" + user.id,
    method: "patch",
    data: {
      phoneNumbers: { home: home, mobile: mobile },
      consent: {
        email: emailConsentChange,
        sms: smsConsentChange,
        nextOfKin: nextOfKinConsentChange
      },
      address: {
        street: streetAddress,
        line2: addressLine2,
        townCity: townCity,
        postCode: postCode
      }
    }
  }));

  function handleSave(event) {
    save();
  }
  return (
    <Stack direction="column">
      <PageTitle title="View Personal Details" />

      <FormLabel>Patient Name</FormLabel>
      <TextField id="patientName" value={name} disabled={true} />

      <FormLabel>Email</FormLabel>
      <TextField id="email" value={patients[0].email} disabled={true} />

      <FormLabel>Mobile No.</FormLabel>
      <TextField id="mobile" value={mobile} onChange={handleMobileChange} />

      <FormLabel>Home Telephone No.</FormLabel>
      <TextField id="home" value={home} onChange={handleHomeChange} />

      <FormLabel>Date of Birth</FormLabel>
      <TextField
        id="dateOfBirth"
        value={patients[0].dateOfBirth}
        disabled={true}
      />

      <FormLabel>GP Name</FormLabel>
      <TextField id="gpName" value={patients[0].staffName} disabled={true} />

      <FormLabel>Street Name</FormLabel>
      <TextField
        id="streetName"
        value={streetAddress}
        onChange={handleStreetAddressChange}
      />

      <FormLabel>Address Line 2</FormLabel>
      <TextField
        id="line2"
        value={addressLine2}
        onChange={handleAddressLine2Change}
      />

      <FormLabel>Town / City</FormLabel>
      <TextField
        id="townCity"
        value={townCity}
        onChange={handleTownCityChange}
      />

      <FormLabel>PostCode</FormLabel>
      <TextField
        id="postCode"
        value={postCode}
        onChange={handlePostCodeChange}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              id="emailConsent"
              checked={emailConsentChange}
              onChange={handleEmailConsentChange}
            />
          }
          label="The surgery may use email to contact me in the future"
        />
        <FormControlLabel
          control={
            <Switch
              id="smsConsent"
              checked={smsConsentChange}
              onChange={handleSmsConsentChange}
            />
          }
          label="The surgery may use SMS to contact me in the future"
        />
        <FormControlLabel
          control={
            <Switch
              id="nextOfKinConsent"
              checked={nextOfKinConsentChange}
              onChange={handleNextOfKinConsentChange}
            />
          }
          label="The surgery may contact my next of kin if necessary"
        />
      </FormGroup>

      <Stack direction="row">
        <Button variation="outlined" onClick={handleSave}>
          Save
        </Button>
        <Button variation="outlined" onClick={handleBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
}
