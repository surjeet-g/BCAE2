

export const getUniqueDistricts = (locations = [], stateName = '') => {

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
}

export const getUniqueState = (locations = []) => {
    console.log('location', locations)
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
}



