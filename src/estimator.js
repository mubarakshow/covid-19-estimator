const covid19ImpactEstimator = (data) => {
  const input = data;
  // console.log(input);
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

  const checkRequestedTime = (periodTypee, timeToElapsee) => {
    let daysValue;
    if (periodTypee === 'weeks') {
      daysValue = timeToElapsee * 7;
    } else if (periodTypee === 'months') {
      daysValue = timeToElapsee * 30;
    } else {
      daysValue = timeToElapsee;
    }
    return daysValue;
  };

  const getInfectionsByRequestedTime = (currentlyInfected) => {
    const x = currentlyInfected * (
      2 ** (Math.trunc(checkRequestedTime(periodType, timeToElapse) / 3)));
    return x;
  };

  const infectionsByRTN = getInfectionsByRequestedTime(currentlyInfectedNormal);
  const infectionsByRTS = getInfectionsByRequestedTime(currentlyInfectedSevere);

  // Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.15);
    return x;
  };

  const severeCaseByRTN = getSevereCaseByRequestedTime(infectionsByRTN);
  const severeCaseByRTS = getSevereCaseByRequestedTime(infectionsByRTS);

  // get number of beds
  const getHospitalBedsByRequestedTime = (severeCaseByRT) => {
    const x = Math.trunc((totalHospitalBeds * 0.35) - severeCaseByRT);
    return x;
  };

  // Challenge 3
  // casesForICUByRequestedTime
  const getCasesForICUByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.05);
    return x;
  };

  // casesForVentilatorsByRequestedTime
  const getCasesForVentilatorsByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.02);
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
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(severeCaseByRTN),
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTN),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTN),
      dollarsInFlight: getDollarsInFlight(infectionsByRTN)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRTS,
      severeCaseByRequestedTime: severeCaseByRTS,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(severeCaseByRTS),
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTS),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTS),
      dollarsInFlight: getDollarsInFlight(infectionsByRTS)
    }
  };
};

export default covid19ImpactEstimator;
