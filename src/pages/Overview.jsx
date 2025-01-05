import React, { useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../assets/css/sections/overview.module.css";
import { useMemo } from "react";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  BarController,
} from "chart.js";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  BarController
);

// إعداد Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Overview = () => {
  const googleMapsApiKey = "AIzaSyAywsxQ1DTWXBu1k6GonbudlIYXdQXdOdA";
  useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const center = {
    lat: 31.7683,
    lng: 35.2137,
  };

  const onMapLoad = useCallback((map) => {
    console.log("Map Loaded", map);
  }, []);

  // استعلام GraphQL لجلب البيانات
  const GET_VILLAGES = gql`
    query GetVillages {
      villages {
        id
        name
        population
        age
        gender
        Latitude
        Longitude
        land
        Urban
      }
    }
  `;

  const [villagesData, setVillagesData] = useState([]);

  useEffect(() => {
    
    // جلب البيانات من GraphQL
    client
      .query({
        query: GET_VILLAGES,
      })
      .then((response) => {
        setVillagesData(response.data.villages);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const firstVillageAge = villagesData[0]?.age || [];
  const firstVillageGender = villagesData[0]?.gender || [];
  const villageNames = villagesData.map((village) => village.name);
  const villagePopulations = villagesData.map((village) => parseFloat(village.population));

  // حساب القيم
  const totalVillages = villagesData.length;
  const totalUrbanAreas = villagesData.filter((village) => village.Urban).length;
  const totalPopulation = villagesData.reduce((sum, village) => sum + parseFloat(village.population), 0);
  const averageLandArea = villagesData.reduce((sum, village) => sum + parseFloat(village.land), 0) / totalVillages;

  useEffect(() => {
    if (ageChartRef.current) ageChartRef.current.destroy();
    if (genderChartRef.current) genderChartRef.current.destroy();
    if (barChartRef.current) barChartRef.current.destroy();

    const ageCtx = document.getElementById("ageChart").getContext("2d");
    ageChartRef.current = new Chart(ageCtx, {
      type: "pie",
      data: {
        labels: ["0-18", "19-35", "36-50", "51+"],
        datasets: [
          {
            label: "Age Distribution",
            data: firstVillageAge,
            backgroundColor: [
              "#a74c65",
              "#2f71a3",
              "#a58c4d",
              "#3c8489",
              "#684eaf",
            ],
          },
        ],
      },
    });

    const genderCtx = document.getElementById("genderChart").getContext("2d");
    genderChartRef.current = new Chart(genderCtx, {
      type: "pie",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender Ratios",
            data: firstVillageGender,
            backgroundColor: ["#2f71a3", "#a74c65"],
          },
        ],
      },
    });

    const barCtx = document.getElementById("barChart").getContext("2d");
    barChartRef.current = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: villageNames,
        datasets: [
          {
            label: "Population",
            data: villagePopulations,
            borderColor: ["rgba(38,171,174,255)"],
            backgroundColor: ["rgba(56,94,106,255)"],
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      if (ageChartRef.current) ageChartRef.current.destroy();
      if (genderChartRef.current) genderChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, [firstVillageAge, firstVillageGender, villageNames, villagePopulations]);

  const ageChartRef = useRef(null);
  const genderChartRef = useRef(null);
  const barChartRef = useRef(null);

  const locations = villagesData.map((village) => ({
    id: village.id,
    name: village.name,
    lat: parseFloat(village.Latitude),
    lng: parseFloat(village.Longitude),
  }));

  return (
    <div className={styles.overview}>
      <h1>Overview</h1>
      <div id="map" className={styles.map}>
        <GoogleMap
          mapContainerStyle={{ width: "78vw", height: "20vw" }}
          zoom={10}
          center={center}
          onLoad={onMapLoad}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </div>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p>Total Number of Villages: {totalVillages}</p>
        </div>
        <div className={styles.statItem}>
          <p>Total Number of Urban Areas: {totalUrbanAreas}</p>
        </div>
        <div className={styles.statItem}>
          <p>Total Population Size: {totalPopulation}</p>
        </div>
        <div className={styles.statItem}>
          <p>Average Land Area: {averageLandArea} sq km</p>
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <h3>Age Distribution</h3>
          <canvas id="ageChart" />
        </div>
        <div className={styles.chartContainer}>
          <h3>Gender Ratios</h3>
          <canvas id="genderChart" />
        </div>
      </div>
      <div className={styles.barChartContainer}>
        <div className="barChart">
          <canvas id="barChart" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
