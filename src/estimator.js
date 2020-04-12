const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    region: {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    // population,
    totalHospitalBeds
  } = input;
  // Challenge 1
  const currentlyInfectedNormal = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;
  const checkRequestedTime = () => {
    let daysValue;
    if (periodType === 'weeks') {
      daysValue = timeToElapse * 7;
    } else if (periodType === 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    return daysValue;
  };

  const getInfectionsByRequestedTimeNormal = (currentlyInfected) => {
    const x = currentlyInfected * (2 ** Math.floor(checkRequestedTime() / 3));
    return x;
  };

  const infectionsByRTN = getInfectionsByRequestedTimeNormal(currentlyInfectedNormal);
  const infectionsByRTS = getInfectionsByRequestedTimeNormal(currentlyInfectedSevere);

  // Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.15);
    return x;
  };

  const severeCaseByRTN = getSevereCaseByRequestedTime(infectionsByRTN);
  const severeCaseByRTS = getSevereCaseByRequestedTime(infectionsByRTS);

  // get number of beds
  const getHospitalBedsByRequestedTime = () => {
    const n = (Math.trunc(totalHospitalBeds * 0.35) - severeCaseByRTN);
    const s = (Math.trunc(totalHospitalBeds * 0.35) - severeCaseByRTS);
    return {
      normal: n,
      severe: s
    };
  };

  // Challenge 3
  // casesForICUByRequestedTime
  const getCasesForICUByRequestedTime = (infectionsByRT) => {
    const x = Math.round(infectionsByRT * 0.05);
    return x;
  };

  // casesForVentilatorsByRequestedTime
  const getCasesForVentilatorsByRequestedTime = (infectionsByRT) => {
    const x = Math.round(infectionsByRT * 0.02);
    return x;
  };

  // dollarsInFlight
  const getDollarsInFlight = (infectionsByRT) => {
    const x = Math.trunc((infectionsByRT * avgDailyIncomePopulation
      * avgDailyIncomeInUSD) / timeToElapse);
    return x;
  };


  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedNormal,
      infectionsByRequestedTime: infectionsByRTN,
      severeCaseByRequestedTime: severeCaseByRTN,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime().normal,
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTN),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTN),
      dollarsInFlight: getDollarsInFlight(infectionsByRTN)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRTS,
      severeCaseByRequestedTime: severeCaseByRTS,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime().severe,
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTS),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTS),
      dollarsInFlight: getDollarsInFlight(infectionsByRTS)
    }
  };
};

export default covid19ImpactEstimator;
