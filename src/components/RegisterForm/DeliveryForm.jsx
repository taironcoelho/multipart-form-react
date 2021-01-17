import React, {useState} from 'react';
import {Grid, TextField, Button} from '@material-ui/core';

function DeliveryData({onSubmit}) {
  const [zipCode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

  function _onSubmit(event) {
    event.preventDefault();
    onSubmit({zipCode, address, buildingNumber, province, city});
  }

  return (
    <form id="delivery-form" onSubmit={_onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            value={zipCode}
            onChange={event => {
              setZipcode(event.target.value);
            }}
            id="zipCode"
            name="zipCode"
            label="Zip Code"
            type="number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={city}
            onChange={event => {
              setCity(event.target.value);
            }}
            id="city"
            name="city"
            label="City"
            type="text"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={province}
            onChange={event => {
              setProvince(event.target.value);
            }}
            id="province"
            name="province"
            label="State/Province"
            type="text"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            value={address}
            onChange={event => {
              setAddress(event.target.value);
            }}
            id="address"
            name="address"
            label="Address (Street or Av.)"
            type="text"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={buildingNumber}
            onChange={event => {
              setBuildingNumber(event.target.value);
            }}
            id="buildingNumber"
            name="buildingNumber"
            label="Building number"
            type="number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Finish Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default DeliveryData;
