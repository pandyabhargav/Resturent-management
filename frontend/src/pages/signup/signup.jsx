import React, { useEffect, useState } from 'react';
import './Registration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        restaurant: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });

    const [restaurants, setRestaurants] = useState([
        "McDonald's",
        'Starbucks',
        'KFC',
        'Domino\'s Pizza',
        'Pizza Hut',
        'Burger King',
        'Subway',
        'Chipotle',
        'Taco Bell',
        'Wendy\'s',
    ]);

    const [newRestaurant, setNewRestaurant] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const countries = ['USA', 'Canada', 'India'];
    const states = ['California', 'New York', 'Texas'];
    const cities = ['Los Angeles', 'New York City', 'San Francisco'];
    const locations = [
        {
            country: 'USA',
            states: [
                { state: 'California', cities: ['Los Angeles', 'San Francisco'] },
                { state: 'New York', cities: ['New York City', 'Buffalo'] },
                { state: 'Texas', cities: ['Houston', 'Dallas'] },
            ],
        },
        {
            country: 'Canada',
            states: [
                { state: 'Ontario', cities: ['Toronto', 'Ottawa'] },
                { state: 'Quebec', cities: ['Montreal', 'Quebec City'] },
                { state: 'British Columbia', cities: ['Vancouver', 'Victoria'] },
            ],
        },
        {
            country: 'India',
            states: [
                { state: 'Maharashtra', cities: ['Mumbai', 'Pune'] },
                { state: 'Delhi', cities: ['Delhi', 'Noida'] },
                { state: 'Tamil Nadu', cities: ['Chennai', 'Madurai'] },
            ],
        },
        {
            country: 'Australia',
            states: [
                { state: 'New South Wales', cities: ['Sydney', 'Newcastle'] },
                { state: 'Victoria', cities: ['Melbourne', 'Geelong'] },
                { state: 'Queensland', cities: ['Brisbane', 'Gold Coast'] },
            ],
        },
        {
            country: 'UK',
            states: [
                { state: 'England', cities: ['London', 'Manchester'] },
                { state: 'Scotland', cities: ['Edinburgh', 'Glasgow'] },
                { state: 'Wales', cities: ['Cardiff', 'Swansea'] },
            ],
        },
        {
            country: 'Germany',
            states: [
                { state: 'Bavaria', cities: ['Munich', 'Nuremberg'] },
                { state: 'Berlin', cities: ['Berlin', 'Potsdam'] },
                { state: 'Hessen', cities: ['Frankfurt', 'Wiesbaden'] },
            ],
        },
        {
            country: 'France',
            states: [
                { state: 'Île-de-France', cities: ['Paris', 'Versailles'] },
                { state: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice'] },
                { state: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble'] },
            ],
        },
        {
            country: 'Spain',
            states: [
                { state: 'Madrid', cities: ['Madrid', 'Alcalá de Henares'] },
                { state: 'Catalonia', cities: ['Barcelona', 'Girona'] },
                { state: 'Andalusia', cities: ['Seville', 'Malaga'] },
            ],
        },
        {
            country: 'Italy',
            states: [
                { state: 'Lazio', cities: ['Rome', 'Tivoli'] },
                { state: 'Lombardy', cities: ['Milan', 'Bergamo'] },
                { state: 'Sicily', cities: ['Palermo', 'Catania'] },
            ],
        },
        {
            country: 'Brazil',
            states: [
                { state: 'São Paulo', cities: ['São Paulo', 'Campinas'] },
                { state: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niterói'] },
                { state: 'Bahia', cities: ['Salvador', 'Feira de Santana'] },
            ],
        },
        {
            country: 'South Africa',
            states: [
                { state: 'Gauteng', cities: ['Johannesburg', 'Pretoria'] },
                { state: 'Western Cape', cities: ['Cape Town', 'Stellenbosch'] },
                { state: 'KwaZulu-Natal', cities: ['Durban', 'Pietermaritzburg'] },
            ],
        },
        {
            country: 'Mexico',
            states: [
                { state: 'CDMX', cities: ['Mexico City', 'Coyoacán'] },
                { state: 'Jalisco', cities: ['Guadalajara', 'Puerto Vallarta'] },
                { state: 'Yucatán', cities: ['Mérida', 'Valladolid'] },
            ],
        },
        {
            country: 'Japan',
            states: [
                { state: 'Tokyo', cities: ['Tokyo', 'Yokohama'] },
                { state: 'Osaka', cities: ['Osaka', 'Kobe'] },
                { state: 'Hokkaido', cities: ['Sapporo', 'Asahikawa'] },
            ],
        },
        {
            country: 'China',
            states: [
                { state: 'Beijing', cities: ['Beijing', 'Tianjin'] },
                { state: 'Shanghai', cities: ['Shanghai', 'Suzhou'] },
                { state: 'Guangdong', cities: ['Guangzhou', 'Shenzhen'] },
            ],
        },
        {
            country: 'Russia',
            states: [
                { state: 'Moscow', cities: ['Moscow', 'Tula'] },
                { state: 'Saint Petersburg', cities: ['Saint Petersburg', 'Pushkin'] },
                { state: 'Krasnoyarsk', cities: ['Krasnoyarsk', 'Zelenogorsk'] },
            ],
        },
    ];


    const [countriesData, setCountriesData] = useState(locations);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleRestaurantChange = (e) => {
        setFormData({
            ...formData,
            restaurant: e.target.value,
        });
        const selectedValue = e.target.value;

        if (selectedValue === "addNewRestaurant") {
            setShowModal(true);  // Show the modal when "+ Add Restaurant" is selected
        } else {
            setFormData({
                ...formData,
                restaurant: selectedValue,
            });
        }
    };

    const handleNewRestaurantChange = (e) => {
        setNewRestaurant(e.target.value);
    };

    const handleAddRestaurant = () => {
        if (newRestaurant && !restaurants.includes(newRestaurant)) {
            setRestaurants([...restaurants, newRestaurant]);
            setFormData({
                ...formData,
                restaurant: newRestaurant,
            });
            setNewRestaurant('');
            setIsModalOpen(false);
            setRestaurants([...restaurants, newRestaurant]);
            setFormData({
                ...formData,
                restaurant: newRestaurant,
            });
            setNewRestaurant('');
        }
        setShowModal(false);  // Close the modal
    };

    const getStates = () => {
        const countryData = countriesData.find(
            (country) => country.country === formData.country
        );
        return countryData ? countryData.states : [];
    };

    // Get cities based on the selected state
    const getCities = () => {
        const stateData = getStates().find(
            (state) => state.state === formData.state
        );
        return stateData ? stateData.cities : [];
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>

        </>
    )
}


export default Registration;