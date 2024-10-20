import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import './App.css';

const App = () => {
    const [formData, setFormData] = useState({
        buyerName: '',
        buyerEmail: '',
        buyerAddress: '',
        date: '',
        salesPerson: '',
        dealNumber: '',
        sellerName: '',
        sellerCompanyName: '',
        sellerAddress: '',
        sellerCityStateZip: '',
        sellerPhone: '',
        sellerEmail: '',
        buyerCompanyName: '',
        buyerCityStateZip: '',
        buyerPhone: '',
        stockNumber: '',
        assetYear: '',
        assetMake: '',
        assetModel: '',
        VIN: '',
        assetMiles: '',
        assetHours: '',
        assetEngine: '',
        assetEngineSerial: '',
        assetFuelTank: '',
        assetTransmission: '',
        assetSuspension: '',
        assetTireSize: '',
        assetWheelType: '',
        assetSleeper: '',
        assetDoubleBunk: '',
        assetInteriorColor: '',
        assetExteriorColor: '',
        assetExteriorOptions: '',
        salePrice: '',
        lienholderName: '',
        lienholderAddress: '',
        lienholderCityStateZip: '',
        lienholderPhoneNumber: '',
        payOff: '',
        payOffExpiration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fillPdfWithFormFields(formData);
    };

    // Function to load the PDF
    const loadPdf = async (url) => {
        const response = await fetch(url);
        return await response.arrayBuffer();
    };

    // Function to fill in the PDF form fields
    const fillPdfWithFormFields = async (formData) => {
        const pdfBytes = await loadPdf('/pdfs/billOfSale.pdf'); // Load your PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const form = pdfDoc.getForm(); // Access the form

        // Helper function to set text for a field
        const setFieldText = (fieldName, value) => {
            try {
                const field = form.getTextField(fieldName);
                field.setText(value);
            } catch (error) {
                console.warn(`Field "${fieldName}" does not exist: ${error.message}`);
            }
        };

        // Fill in the PDF form fields using the helper function
        setFieldText('buyerName', formData.buyerName);
        setFieldText('buyerEmail', formData.buyerEmail);
        setFieldText('buyerAddress', formData.buyerAddress);
        setFieldText('date', formData.date);
        setFieldText('salesPerson', formData.salesPerson);
        setFieldText('dealNumber', formData.dealNumber);
        setFieldText('sellerName', formData.sellerName);
        setFieldText('sellerCompanyName', formData.sellerCompanyName);
        setFieldText('sellerAddress', formData.sellerAddress);
        setFieldText('sellerCityStateZip', formData.sellerCityStateZip);
        setFieldText('sellerPhone', formData.sellerPhone);
        setFieldText('sellerEmail', formData.sellerEmail);
        setFieldText('buyerCompanyName', formData.buyerCompanyName);
        setFieldText('buyerCityStateZip', formData.buyerCityStateZip);
        setFieldText('buyerPhone', formData.buyerPhone);
        setFieldText('stockNumber', formData.stockNumber);
        setFieldText('assetYear', formData.assetYear);
        setFieldText('assetMake', formData.assetMake);
        setFieldText('assetModel', formData.assetModel);
        setFieldText('VIN', formData.VIN);
        setFieldText('assetMiles', formData.assetMiles);
        setFieldText('assetHours', formData.assetHours); // This will be ignored if the field doesn't exist
        setFieldText('assetEngine', formData.assetEngine);
        setFieldText('assetEngineSerial', formData.assetEngineSerial);
        setFieldText('assetFuelTank', formData.assetFuelTank);
        setFieldText('assetTransmission', formData.assetTransmission);
        setFieldText('assetSuspension', formData.assetSuspension);
        setFieldText('assetTireSize', formData.assetTireSize);
        setFieldText('assetWheelType', formData.assetWheelType);
        setFieldText('assetSleeper', formData.assetSleeper);
        setFieldText('assetDoubleBunk', formData.assetDoubleBunk);
        setFieldText('assetInteriorColor', formData.assetInteriorColor);
        setFieldText('assetExteriorColor', formData.assetExteriorColor);
        setFieldText('assetExteriorOptions', formData.assetExteriorOptions);
        setFieldText('salePrice', formData.salePrice);
        setFieldText('lienholderName', formData.lienholderName);
        setFieldText('lienholderAddress', formData.lienholderAddress);
        setFieldText('lienholderCityStateZip', formData.lienholderCityStateZip);
        setFieldText('lienholderPhoneNumber', formData.lienholderPhoneNumber);
        setFieldText('payOff', formData.payOff);
        setFieldText('payOffExpiration', formData.payOffExpiration);
        setFieldText('sellerCDLNumber', formData.sellerCDLNumber);
        setFieldText('buyerCDLNumber', formData.buyerCDLNumber);
        setFieldText('buyerYearsDriving', formData.buyerYearsDriving);
        setFieldText('buyerYearsOwner', formData.buyerYearsDriving);
        setFieldText('assetPlateNumber', formData.buyerYearsDriving);
        setFieldText('buyerFleetSize', formData.buyerFleetSize);
        setFieldText('buyerTrucksInFleet', formData.buyerTrucksInFleet);
        setFieldText('buyerTrailersInFleet', formData.buyerTrailersInFleet);
        setFieldText('buyerEIN', formData.buyerEIN);
        setFieldText('buyerSS', formData.buyerSS);
        setFieldText('buyerCDLState', formData.buyerCDLState);
        setFieldText('sellerCDLState', formData.sellerCDLState);

        // Serialize the PDF and trigger a download
        const pdfBytesFilled = await pdfDoc.save();
        const blob = new Blob([pdfBytesFilled], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `filled-form.pdf`;
        link.click();
    };

    return (
        <form onSubmit={handleSubmit}>
          <div className='header'>
            <input type="date" name="date" onChange={handleChange} /> 
            <input type="text" name="salesPerson" placeholder="Sales Person" onChange={handleChange} />
            <input type="text" name="dealNumber" placeholder="Deal Number" onChange={handleChange} />
            <input type="text" name="stockNumber" placeholder="Stock Number" onChange={handleChange} />
          </div>
          <div className='buyerInfo'>
            <h2>Buyer</h2>
            <input type="text" name="buyerName" placeholder="Buyer Name" onChange={handleChange} />
            <input type="email" name="buyerEmail" placeholder="Buyer Email" onChange={handleChange} />
            <input type="text" name="buyerAddress" placeholder="Buyer Address" onChange={handleChange} />
            <input type="text" name="buyerCompanyName" placeholder="Buyer Company Name" onChange={handleChange} />
            <input type="text" name="buyerEIN" placeholder="EIN" onChange={handleChange} />
            <input type="text" name="buyerCDLNumber" placeholder="CDL Number" onChange={handleChange} />
            <input type="text" name="buyerCDLState" placeholder="CDL State" onChange={handleChange} />
            <input type="text" name="buyerSS" placeholder="SSN" onChange={handleChange} />
            <input type="text" name="buyerCityStateZip" placeholder="Buyer City, State, Zip" onChange={handleChange} />
            <input type="tel" name="buyerPhone" placeholder="Buyer Phone" onChange={handleChange} />
            <input type="text" name="buyerYearsDriving" placeholder="Commercial Driving Experience" onChange={handleChange} />
            <input type="text" name="buyerYearsOwner" placeholder="Owner Operator Experience" onChange={handleChange} />
            <input type="text" name="buyerFleetSize" placeholder="Fleet Size" onChange={handleChange} />
            <input type="text" name="buyerTrucksInFleet" placeholder="Trucks in Fleet" onChange={handleChange} />
            <input type="text" name="buyerTrailersInFleet" placeholder="Trailers in Fleet" onChange={handleChange} />





          </div>
          <div className='sellerInfo'>
            <h2>Seller</h2>
            <input type="text" name="sellerName" placeholder="Seller Name" onChange={handleChange} />
            <input type="text" name="sellerCompanyName" placeholder="Seller Company Name" onChange={handleChange} />
            <input type="text" name="sellerCDLNumber" placeholder="CDL Number" onChange={handleChange} />
            <input type="text" name="sellerCDLState" placeholder="CDL State" onChange={handleChange} />
            <input type="text" name="sellerAddress" placeholder="Seller Address" onChange={handleChange} />
            <input type="text" name="sellerCityStateZip" placeholder="Seller City, State, Zip" onChange={handleChange} />
            <input type="tel" name="sellerPhone" placeholder="Seller Phone" onChange={handleChange} />
            <input type="email" name="sellerEmail" placeholder="Seller Email" onChange={handleChange} />
          </div>
          <div className='assetDetails'>
            <h2>Asset</h2>
            <input type="text" name="assetYear" placeholder="Asset Year" onChange={handleChange} />
            <input type="text" name="assetMake" placeholder="Asset Make" onChange={handleChange} />
            <input type="text" name="assetModel" placeholder="Asset Model" onChange={handleChange} />
            <input type="text" name="VIN" placeholder="VIN" onChange={handleChange} />
            <input type="text" name="assetPlateNumber" placeholder="lic plate number" onChange={handleChange} />
            <input type="text" name="assetMiles" placeholder="Asset Miles" onChange={handleChange} />
            <input type="text" name="assetHours" placeholder="Asset Hours" onChange={handleChange} /> {/* Optional field */}
            <input type="text" name="assetEngine" placeholder="Asset Engine" onChange={handleChange} />
            <input type="text" name="assetEngineSerial" placeholder="Asset Engine Serial" onChange={handleChange} />
            <input type="text" name="assetFuelTank" placeholder="Asset Fuel Tank" onChange={handleChange} />
            <input type="text" name="assetTransmission" placeholder="Asset Transmission" onChange={handleChange} />
            <input type="text" name="assetSuspension" placeholder="Asset Suspension" onChange={handleChange} />
            <input type="text" name="assetTireSize" placeholder="Asset Tire Size" onChange={handleChange} />
            <input type="text" name="assetWheelType" placeholder="Asset Wheel Type" onChange={handleChange} />
            <input type="text" name="assetSleeper" placeholder="Asset Sleeper" onChange={handleChange} />
            <input type="text" name="assetDoubleBunk" placeholder="Asset Double Bunk" onChange={handleChange} />
            <input type="text" name="assetInteriorColor" placeholder="Asset Interior Color" onChange={handleChange} />
            <input type="text" name="assetExteriorColor" placeholder="Asset Exterior Color" onChange={handleChange} />
            <input type="text" name="assetExteriorOptions" placeholder="Asset Exterior Options" onChange={handleChange} />
            <input type="text" name="salePrice" placeholder="Sale Price" onChange={handleChange} />
            <input type="text" name="lienholderName" placeholder="Lienholder Name" onChange={handleChange} />
            <input type="text" name="lienholderAddress" placeholder="Lienholder Address" onChange={handleChange} />
            <input type="text" name="lienholderCityStateZip" placeholder="Lienholder City, State, Zip" onChange={handleChange} />
            <input type="tel" name="lienholderPhoneNumber" placeholder="Lienholder Phone Number" onChange={handleChange} />
            <input type="text" name="payOff" placeholder="Pay Off" onChange={handleChange} />
            <input type="text" name="payOffExpiration" placeholder="Pay Off Expiration" onChange={handleChange} />
          </div>
          <br></br>
            <button type="submit">Submit</button>
        </form>
    );
};

export default App;