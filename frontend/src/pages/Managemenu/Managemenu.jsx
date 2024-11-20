import React, { useState } from 'react';
import { Tabs, Tab, Card, Row, Modal, Button, Form, Col } from 'react-bootstrap';
import { FaSquarePlus } from "react-icons/fa6";
import './Managemenu.css';
import { FaTrashAlt } from "react-icons/fa";
import { useDropzone } from 'react-dropzone'; 
import { FaImage } from "react-icons/fa";

const Managemenu = () => {
        const [activeCategory, setActiveCategory] = useState('all'); 
         const [showOptions, setShowOptions] = useState({}); 
        const [expandedDescription, setExpandedDescription] = useState(null); 
        const [showModal, setShowModal] = useState(false);
        const [formData, setFormData] = useState({ title: '', image: null }); 
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [deleteItemId, setDeleteItemId] = useState(null);
        const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
        const [newCategory, setNewCategory] = useState({ name: '', image: null });
        const [showAddBurgerPopup, setShowAddBurgerPopup] = useState(false);
        const [burgerData, setBurgerData] = useState({
            name: '',
            description: '',
            price: '',
            image: null,
          });
          const handleAddBurger = () => {
            console.log('New Burger Data:', burgerData);
            setShowAddBurgerPopup(false);
          };
    
        const handleDeleteClick = (itemId) => {
            setDeleteItemId(itemId);
            setShowDeleteModal(true);
          };


          const handleAddCategory = () => {
            console.log('Adding new category:', newCategory);
            setShowAddCategoryPopup(false); // Close the popup
          };
          
          const handleCloseDelete = () => setShowDeleteModal(false);
          
          
          const handleConfirmDelete = () => {
        
            const updatedCategories = categories.filter(category => category.key !== deleteItemId);
            setCategories(updatedCategories);
            setShowDeleteModal(false);
          };
          

        const handleEditClick = () => {
        setShowModal(true); 
        };
    
        const handleClose = () => {
        setShowModal(false); // Close modal
        };
    
        const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const handleDrop = (acceptedFiles) => {
        setFormData({ ...formData, image: acceptedFiles[0] });
        };
    
        // Use react-dropzone for image drag-and-drop functionality
        const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
        });
  
        const indianFoods = [
            'Butter Chicken',
            'Paneer Tikka',
            'Chole Bhature',
            'Biryani',
            'Aloo Gobi',
            'Palak Paneer',
            'Dosa',
            'Samosa',
            'Pav Bhaji',
            'Dal Makhani',
          ];

          
    const categories = [
        { key: 'all', label: 'All', icon: 'https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fqlZUfKFRFu51rIF9qDNDkX0hM-6lh4dEHGSzuRhJa5Q~bKsQa-ZSz4ZwuTn-4Xk~unVxU1487GcGkXc9riyZV3incW-NPudZp5Lbmzwi4b1I6LBmnWFHGvt-Z~HeObvHK7Tgf7EcCEgLQnz6zt4PMTcGAoNAlXmbfxhM5Py6jnZcN0z0s4rS~q~My96tK9RKr1MlMRwUnwpLw~E9xPMsHlxXYTM2-h2KLnOBtgrf4JzaOVL0BFNqI7WntUwv~CVz8S8UcUPIqV17ntWoMQ0QFPr4SsMKsneujfYH1G28AvHeMRC5P7jpzo~6pu0tqYtmeRl~-Hr-n~mwru6SzGLQA__' },
        { key: 'burger', label: 'Burger', icon: 'https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fqlZUfKFRFu51rIF9qDNDkX0hM-6lh4dEHGSzuRhJa5Q~bKsQa-ZSz4ZwuTn-4Xk~unVxU1487GcGkXc9riyZV3incW-NPudZp5Lbmzwi4b1I6LBmnWFHGvt-Z~HeObvHK7Tgf7EcCEgLQnz6zt4PMTcGAoNAlXmbfxhM5Py6jnZcN0z0s4rS~q~My96tK9RKr1MlMRwUnwpLw~E9xPMsHlxXYTM2-h2KLnOBtgrf4JzaOVL0BFNqI7WntUwv~CVz8S8UcUPIqV17ntWoMQ0QFPr4SsMKsneujfYH1G28AvHeMRC5P7jpzo~6pu0tqYtmeRl~-Hr-n~mwru6SzGLQA__' },
        { key: 'icecream', label: 'Ice Cream', icon: 'https://s3-alpha-sig.figma.com/img/05de/774e/807dd6ec092da5e280109b013c513a0d?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EQ0cdAk8BmcXXzstEebi6ncCRnYBW-ApWef1AiVGUaIoCU0YT32QQmRbKdfNrkVvaqV36oN2Yp9Md-xjqrjKZ9f6DP9p08kV0UIYbeHIqKujEwBpxoaknwhBAAmkDPqJBDC8KhVFvzALrYhgtu9xNrdzOEmzvjVX0PRs08bLPfMncWI4QSLRiS56YW3vC3JMykMfqa9xyCAjeCXsoPFyFVXqk8S8eccAAN4mAnFTxmEtn9PCAjq0G5dYxxRfFVC-~7FDjhC5n7cdZq7t8o3Kni33fGFlzC5-WOpyRcycqp2wzCjiTqWGiPEZiYTjyL8MOi8p7XuBSxZ2MnmQNcCxQA__' },
        { key: 'frenchfries', label: 'French Fries', icon: 'https://s3-alpha-sig.figma.com/img/c495/ed87/1338e2e608f2055840d3132745fa5027?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YuXGjICbfNOIbMPScZ~m4vMkxNE5gJpG5eWpn6TnjEm9RdyH0gmGw1L0KPlYUD--kWvE2kxNMZ7gRrPBpoSMYDKzcEgObj3cu468XG6R1vxUPigGBbhkAba2OSSPI9GyScIaEnz5FSR0H8UNBtW~5y2U~LceWharlf1o4RKy1E~XDqUGyR-l~tWp3L~~IUvxGjq3br0VOzvtPuX0OD1pWW2CCSUJ9a5UUD2OhJT7dapZjDRlkkOV0BNk4NwIqFgJZ~CTzjOC00ibTO3HDYTXKcrX~D5Fikx6JJeG~34Q586B-XuFNEle65bJMMXx9MeXE501xDD3javZoOg5P5IgUA__' },
        { key: 'sandwich', label: 'Sandwich', icon: 'https://s3-alpha-sig.figma.com/img/9ac5/7848/92cebe7826b91979d7ec7154dc714870?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c2D7vqcnv5Ywz6gQgSV9cpcM4ZE7vjwBtzK52ylJuo0Fn9DnVuwYs1nCjaw92t8JoIXe091vlq8d6JnqxjsAZE6lKuafFSobpKfau8F5g0EvGvxT-s1rktxnpYLq64rihl-O9I2PiW3ePCds9fkMdg6yM78qAPei3HAlmAl6Z2DCMt4K0gUE-7CgafEHmfMv3WWf3qWS6szbzCw5sn9PbMXrO4DC6sTuHGIRHmMUEgeHTXrcWss4DM3PadXhNmbaKpy4LxZvujLwFb3vzxRswg29eN~of7fwkYrWbqZPBKuWGMOoytPK4H0DTA1BMH4POrfQhvplEJkq9oeZBWVaQg__' },
        { key: 'drinkjuice', label: 'Drink/Juice', icon: 'https://s3-alpha-sig.figma.com/img/cecc/4fd1/3829c29c170bee25c8af06e829cde3de?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OfxfZ4fRAzEnRwdu3RpkoWOy--A22Bm7ldyJ6mdYxgbIC5n4tPJVRwdI8ElHVpGHWW2BGqlhW1qO~mVhnV2b9SWf0LgkonUbSNU5CcCkWH0VYCdSwbQVmDAXmb5-brCFVUchyzksqPbzebI4vLeQrhBDgNvXdxR6ktCeN6Tnj0~OGVWYD1xI5tAv~VglpbIhSreGuGGOzVwRiAd5Oi5Etn3O1p7-c5K9fY4PVxD1nyeQekWusbqyai~G7X3fIa~nW6PWZztwgx8LfnG0mR3pE-b8EeqjjzxlR2hBJdHKyS9R0d7zE5tnEv2K0V1nBaANBw2KXpJZSPYp6fimsRIbow__' }
    ];


  const categoryData = {
    all: [
        { title: ' Cheeseburger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$10.99', imgSrc: 'https://img.freepik.com/free-photo/view-homemade-delicious-sandwiches-black-board-gray-blurred-surface_179666-42327.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Green Leaves Burger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$20.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-vegetarian-burger-counter-with-tomatoes_23-2148784525.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Snack Pack', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.99', imgSrc: 'https://img.freepik.com/free-photo/high-angle-arrangement-with-cheeseburger-fries_23-2148289438.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Kids Special', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$8.99', imgSrc: 'https://img.freepik.com/free-photo/top-view-delicious-fried-chicken-with-french-fries_140725-114722.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Classic Combo', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$12.99', imgSrc: 'https://img.freepik.com/free-photo/cook-holding-tasty-burgers-front-view_23-2149897387.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Value Pack', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$9.99', imgSrc: 'https://img.freepik.com/free-photo/high-angle-mix-alcoholic-drinks_23-2148673763.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Mini Feast', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$7.99', imgSrc: 'https://img.freepik.com/free-photo/high-angle-family-celebrating-birthday_23-2150599007.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Super Snack', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$6.49', imgSrc: 'https://img.freepik.com/free-photo/top-view-different-kind-snacks-as-nuts-crackers-cookies-bowls-dark-surface-horizontal_176474-950.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Budget Meal', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$4.99', imgSrc: 'https://img.freepik.com/free-photo/dollar-burger_1401-440.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Gourmet Pack', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$15.99', imgSrc: 'https://img.freepik.com/free-photo/three-mini-chicken-burgers-served-with-french-fries-coleslaw-mayonnaise-ketchup_140725-7062.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' }
      ],
      burger: [
        { title: ' Cheeseburger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.99', imgSrc: 'https://img.freepik.com/free-photo/huge-burger-with-fried-meat-vegetables_140725-971.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Green Leaves Burger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$4.49', imgSrc: 'https://img.freepik.com/free-photo/front-view-vegetarian-burger-counter-with-tomatoes_23-2148784525.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: ' Cheese Burger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$6.99', imgSrc: 'https://img.freepik.com/free-photo/still-life-delicious-american-hamburger_23-2149637305.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Miso Burgers', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$8.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-fresh-beef-burgers-with-bacon-beer_23-2148784481.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Burger Chefs', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$6.49', imgSrc: 'https://img.freepik.com/free-photo/smiling-young-male-baker-holding-bun-eyes_23-2147883342.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Burger Monsta', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$7.49', imgSrc: 'https://img.freepik.com/free-photo/spooky-burger-city_23-2150902136.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Cheese Burger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$7.99', imgSrc: 'https://img.freepik.com/free-photo/still-life-delicious-american-hamburger_23-2149637312.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Paneer Burger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$8.49', imgSrc: 'https://img.freepik.com/free-photo/high-angle-delicious-hamburger_23-2148575449.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Green Leaves Burger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$6.99', imgSrc: 'https://img.freepik.com/free-photo/high-angle-beef-burger-with-salad_23-2148784488.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Hamburger ', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$7.49', imgSrc: 'https://img.freepik.com/free-photo/huge-burger-with-fried-meat-vegetables_140725-971.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' }
      ],
      icecream: [
        { title: 'Vanila', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.49', imgSrc: 'https://img.freepik.com/free-photo/ice-cream-balls-bowl_1220-571.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Choclate', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/bowl-with-ice-cream-table_23-2148422032.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Pineple', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.79', imgSrc: 'https://img.freepik.com/free-photo/flat-lay-yummy-popsicles-plate-with-ice_23-2148763667.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Dry fruit', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/closeup-shot-bowl-ice-cream-with-beautiful-flower-decorations_181624-1766.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Mix cone ', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.49', imgSrc: 'https://img.freepik.com/free-photo/four-scoops-ice-cream_144627-8359.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Vanila', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.49', imgSrc: 'https://img.freepik.com/free-photo/ice-cream-balls-bowl_1220-571.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Choclate', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/bowl-with-ice-cream-table_23-2148422032.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Pineple', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.79', imgSrc: 'https://img.freepik.com/free-photo/flat-lay-yummy-popsicles-plate-with-ice_23-2148763667.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Dry fruit', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/closeup-shot-bowl-ice-cream-with-beautiful-flower-decorations_181624-1766.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
        { title: 'Mix cone ', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.49', imgSrc: 'https://img.freepik.com/free-photo/four-scoops-ice-cream_144627-8359.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' }
      ],
      frenchfries: [
          { title: 'Small Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/french-fries-with-mayonnaise-ketchup_140725-2742.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Large Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Cheese Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.49', imgSrc: 'https://img.freepik.com/free-photo/top-view-chips-with-sauses-bowls-black-stone_176474-1209.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Curly Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/fries-cone-yellow-background_23-2148258398.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Sweet Potato Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.99', imgSrc: 'https://img.freepik.com/free-photo/french-fries_144627-34655.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Small Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/french-fries-with-mayonnaise-ketchup_140725-2742.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Large Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Cheese Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.49', imgSrc: 'https://img.freepik.com/free-photo/top-view-chips-with-sauses-bowls-black-stone_176474-1209.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Curly Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/fries-cone-yellow-background_23-2148258398.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Sweet Potato Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.99', imgSrc: 'https://img.freepik.com/free-photo/french-fries_144627-34655.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' }
  
        ],
        sandwich: [
          { title: 'Club Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-delicious-ham-sandwiches-with-french-fries-seasonings-dark-surface_179666-34427.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Veggie Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$4.49', imgSrc: 'https://img.freepik.com/free-photo/vegetable-sandwich-with-cheese-ham-lemon-avocado-wooden-cutting-board-flat-lay_176474-8423.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Chicken Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$6.99', imgSrc: 'https://img.freepik.com/free-photo/club-sandwich-chicken-breast-lettuce-cheese-toast-bread-tomato-cucumber-french-fries-side-view_141793-3533.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'BLT Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.49', imgSrc: 'https://img.freepik.com/free-photo/top-view-four-triangle-sandwiches-with-tomatoes-salad_23-2148640147.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Grilled Cheese Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.99', imgSrc: 'https://img.freepik.com/free-photo/high-angle-triangle-sandwiches-with-tomatoes_23-2148640141.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Club Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-delicious-ham-sandwiches-with-french-fries-seasonings-dark-surface_179666-34427.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Veggie Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$4.49', imgSrc: 'https://img.freepik.com/free-photo/vegetable-sandwich-with-cheese-ham-lemon-avocado-wooden-cutting-board-flat-lay_176474-8423.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Chicken Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$6.99', imgSrc: 'https://img.freepik.com/free-photo/club-sandwich-chicken-breast-lettuce-cheese-toast-bread-tomato-cucumber-french-fries-side-view_141793-3533.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'BLT Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.49', imgSrc: 'https://img.freepik.com/free-photo/top-view-four-triangle-sandwiches-with-tomatoes-salad_23-2148640147.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Grilled Cheese Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.99', imgSrc: 'https://img.freepik.com/free-photo/high-angle-triangle-sandwiches-with-tomatoes_23-2148640141.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' }
        ],
        drinkjuice: [
          { title: 'Cola', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.49', imgSrc: 'https://img.freepik.com/free-photo/fresh-cola-drink-with-green-lime_144627-12396.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Lemonade', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-lemonade-wooden-serving-board-lemon-slices-potted-plant-brown-surface_140725-103295.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Iced Tea', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.79', imgSrc: 'https://img.freepik.com/free-photo/refreshing-drink_144627-20873.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Coffee', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/side-view-cup-coffee-with-wafer-roll-filled-with-condensed-milk-plate-coffee-beans_141793-6962.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Orange Juice', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.49', imgSrc: 'https://img.freepik.com/free-photo/colorful-orange-juice-glass_23-2148226010.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Cola', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.49', imgSrc: 'https://img.freepik.com/free-photo/fresh-cola-drink-with-green-lime_144627-12396.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Lemonade', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-lemonade-wooden-serving-board-lemon-slices-potted-plant-brown-surface_140725-103295.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Iced Tea', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.79', imgSrc: 'https://img.freepik.com/free-photo/refreshing-drink_144627-20873.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Coffee', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/side-view-cup-coffee-with-wafer-roll-filled-with-condensed-milk-plate-coffee-beans_141793-6962.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
          { title: 'Orange Juice', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$3.49', imgSrc: 'https://img.freepik.com/free-photo/colorful-orange-juice-glass_23-2148226010.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' }
        ]
  };
  

  const handleDescriptionClick = (index) => {
    setExpandedDescription(expandedDescription === index ? null : index); 
  };

  return (
    <div className="menu-wrapper mb-5">
    <div className="tab-header">
      <h2 className="tab-title">Categories (250)</h2>
      <button className="add-category-btn" onClick={() => setShowAddCategoryPopup(true)}>
          <span style={{ fontSize: '24px', lineHeight: '1', marginRight: '10px' }}>
            <FaSquarePlus />
          </span>
          Add Categories
        </button>
    </div>
    <br />
    <Tabs activeKey={activeCategory} onSelect={(category) => setActiveCategory(category)} className="mb-3">
        {categories.map((category) => (
          <Tab
            eventKey={category.key}
            key={category.key}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={category.icon}
                  alt={`${category.label} icon`}
                  style={{
                    width: '70px',
                    height: '50px',
                    marginRight: '8px',
                    backgroundColor: 'rgba(31, 29, 43, 1)',
                  }}
                />
                {category.label}
              </div>
            }
          >
            <div className="tab-header">
              <h2 className="tab-title">{category.label}</h2>
              {category.key === 'burger' && (
                <button className="add-category-btn" onClick={() => setShowAddBurgerPopup(true)}>
                  <span style={{ fontSize: '24px', lineHeight: '1', marginRight: '10px' }}>
                    <FaSquarePlus />
                  </span>
                  Add Burger
                </button>
              )}
            </div>

            <Row className="menu-grid row-cols-1 row-cols-sm-2 row-cols-md-3">
              {(categoryData[category.key] || []).map((card, index) => (
                <div
                  className="card-item"
                  key={card.key}
                  style={{ width: '18rem', margin: '10px', position: 'relative' }}
                >
                  <Card className="h-100" style={{ border: 'none', overflow: 'hidden' }}>
                    <div className="card-img-wrapper">
                      <Card.Img variant="top" src={card.imgSrc} />
                      <div
                        className="three-dots"
                        onClick={() => setShowOptions(showOptions === index ? null : index)}
                      >
                        <span>...</span>
                      </div>
                      {showOptions === index && (
                        <div className="card-actions" style={{ backgroundColor: 'rgba(37, 40, 54, 1)' }}>
                          <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteClick(card.key)}>Delete</button>
                        </div>
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text style={{ color: '#bbb' }}>
                        {expandedDescription === index
                          ? card.description
                          : `${card.description.slice(0, 50)}...`}
                        <span
                          className="expand-text"
                          onClick={() => setExpandedDescription(expandedDescription === index ? null : index)}
                        >
                          {expandedDescription === index ? ' Show Less' : ' Read More'}
                        </span>
                      </Card.Text>
                      <Card.Text className="price">{card.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </Tab>
        ))}
      </Tabs>
    {/* Modal for Edit Form */}
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title  className="text-start">Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Drag-and-Drop Area for Image */}
          <div {...getRootProps()} style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center', marginBottom:'15px' }}>
            <input {...getInputProps()} />
            {formData.image ? (
              <p>Image selected: {formData.image.name}</p>
            ) : (
              <p><span style={{fontSize:'20px'}}><FaImage />ㅤ</span>Choose Image</p>
            )}
          </div>

          {/* Item Details Fields */}
          <Row className="mb-3">
            {/* Item Name (Dropdown with Indian foods) */}
              <Form.Group className='mb-3'>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  as="select"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #bbb',
                    color: '#bbb' 
                  }}
                >
                  <option value="">Select Item</option>
                  {indianFoods.map((food, index) => (
                    <option key={index} value={food}>
                      {food}
                    </option>
                    
                  ))}
                  
                </Form.Control>
              </Form.Group>
            </Row>
            {/* Ingredients */}
           <Row>
              <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  placeholder="Enter ingredients"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #bbb',
                    backgroundColor:'rgba(45, 48, 62, 1)',
                  }}
                />
              </Form.Group>
           </Row>
          <Row className="mb-3">
            {/* Rate */}
            <Col>
              <Form.Group>
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  placeholder="Enter rate"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #bbb',
                    backgroundColor:'rgba(45, 48, 62, 1)',
                  }}
                />
              </Form.Group>
            </Col>

            {/* Discount */}
            <Col>
              <Form.Group>
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Enter discount"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #bbb',
                    backgroundColor:'rgba(45, 48, 62, 1)',
                
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Availability Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Availability</Form.Label>
            <Form.Control
              as="select"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #bbb',
                color: '#bbb' 
              }}
            >
              <option value="available">Available</option>
              <option value="not_available">Not Available</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Cancel Button */}
        <Button variant="secondary" onClick={handleClose} style={{backgroundColor:'rgba(51, 55, 72, 1)', border:'1px solid #bbb'}}>
          Cancel
        </Button>
        
        {/* Save Changes Button */}
        <Button  onClick={handleClose} style={{backgroundColor:'rgba(202, 146, 61, 1)'}}>
          Save 
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showDeleteModal} onHide={handleCloseDelete}>
      <Modal.Header>
        <Modal.Title className="text-start">Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-confirmation">
        <center>
            <div
                style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90px',
                height: '90px', 
                borderRadius: '50%',
                backgroundColor: '#d9534f',
                marginBottom: '10px',
                }}
            >
                <FaTrashAlt style={{ fontSize: '3rem', color: '#fff' }} />
            </div>
            <p>Are you sure you want to delete this item?</p>
            </center>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete} style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}>
          No
        </Button>
        <Button onClick={handleConfirmDelete} style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>

                  {/* Add Categories Popup */}
      <Modal show={showAddCategoryPopup} onHide={() => setShowAddCategoryPopup(false)}>
        <Modal.Header>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Category Name */}
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#bbb',
                }}
              />
            </Form.Group>

            {/* Image Upload */}
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #ddd',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '15px',
                cursor: 'pointer',
                backgroundColor: 'rgba(45, 48, 62, 1)',
                color: '#bbb',
              }}
            >
              <input {...getInputProps()} />
              {newCategory.image ? (
                <p>Image selected: {newCategory.image.name}</p>
              ) : (
                <p>
                  <span style={{ fontSize: '20px' }}>
                    <FaImage />ㅤ
                  </span>
                  Drag & drop an image here, or click to select files
                </p>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCategoryPopup(false)}
            style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCategory}
            style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}
          >
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddBurgerPopup} onHide={() => setShowAddBurgerPopup(false)}>
        <Modal.Header>
          <Modal.Title>Add New Burger</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Burger Name</Form.Label>
              <Form.Control
                type="text"
                value={burgerData.name}
                onChange={(e) => setBurgerData({ ...burgerData, name: e.target.value })}
                placeholder="Enter burger name"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#bbb',
                }}
              />
            </Form.Group>

            {/* Description Field */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={burgerData.description}
                onChange={(e) =>
                  setBurgerData({ ...burgerData, description: e.target.value })
                }
                placeholder="Enter burger description"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#fff',
                }}
              />
            </Form.Group>

            {/* Price Field */}
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={burgerData.price}
                onChange={(e) =>
                  setBurgerData({ ...burgerData, price: e.target.value })
                }
                placeholder="Enter price"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#bbb',
                }}
              />
            </Form.Group>

            {/* Image Upload Field */}
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #ddd',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '15px',
                cursor: 'pointer',
                backgroundColor: 'rgba(45, 48, 62, 1)',
                color: '#bbb',
              }}
            >
              <input {...getInputProps()} />
              {burgerData.image ? (
                <p>Image selected: {burgerData.image.name}</p>
              ) : (
                <p>
                  <span style={{ fontSize: '20px' }}>
                    <FaImage />ㅤ
                  </span>
                  Drag & drop an image here, or click to select files
                </p>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddBurgerPopup(false)}
            style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddBurger}
            style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}
          >
            Add Burger
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
);
};

export default Managemenu;