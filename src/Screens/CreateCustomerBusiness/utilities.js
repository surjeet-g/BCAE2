export const getUniqueDistricts = (locations = [], stateName = "") => {
  let uniqueDistrictKey = [];

  let uniqueDistrictData = [];
  if (locations.length > 0) {
    locations?.map((item) => {
      if (!(uniqueDistrictKey.indexOf(item.district) > -1)) {
        if (item.state == stateName) {
          uniqueDistrictKey.push(item.district);
        }
      }
    });

    uniqueDistrictKey?.map((item) => {
      uniqueDistrictData.push({ description: item, id: item });
    });
  }

  return uniqueDistrictData;
};

export const getUniqueState = (locations = []) => {
  // console.log("location", locations);
  let uniqueDistrictKey = [];

  let uniqueDistrictData = [];
  if (locations.length > 0) {
    locations.map((item) => {
      if (!(uniqueDistrictKey.indexOf(item.state) > -1)) {
        uniqueDistrictKey.push(item.state);
      }
    });

    uniqueDistrictKey?.map((item) => {
      uniqueDistrictData.push({ description: item, id: item });
    });
  }

  return uniqueDistrictData;
};
export const getPostCodeByCity = (locations = [], city = "") => {
  let finalPostcodeData = [];

  if (locations?.length > 0 && city != "") {
    const addrByDistrict = locations.filter((addr) => addr.city == city);

    finalPostcodeData = addrByDistrict.map((item) => {
      return { description: item.postCode, id: item.postCode };
    });
  }

  return finalPostcodeData;
};

export const getCityByDistrict = (locations = [], district = "") => {
  // let finalKampongData = [{ description: "sdfsdf", id: 12 }];
  let finalKampongData = [];
  let uniqueDistrictKey = [];

  let uniqueDistrictData = [];
  //("entering inside");
  if (locations?.length > 0 && district != "") {
    // console.warn("entering inside");
    const addrByDistrict = locations.filter(
      (addr) => addr.district == district
    );
    //console.warn("point", addrByDistrict);
    if (addrByDistrict.length != 0) {
      console.log("point 1", addrByDistrict);
      addrByDistrict.map((item) => {
        if (!(uniqueDistrictKey.indexOf(item.city) > -1)) {
          uniqueDistrictKey.push(item.city);
        }
      });

      finalKampongData = uniqueDistrictKey.map((item) => {
        return { description: item, id: item };
      });
      console.log("point 3", finalKampongData);
    }
  }
  // console.warn("", savedLocation?.addressLoopupData);

  return finalKampongData;
};
