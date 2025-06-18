 const travelData = {
            "countries": [
                {
                    "id": 1,
                    "name": "Australia",
                    "cities": [
                        {
                            "name": "Sydney, Australia",
                            "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
                            "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
                        },
                        {
                            "name": "Melbourne, Australia",
                            "imageUrl": "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80",
                            "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Japan",
                    "cities": [
                        {
                            "name": "Tokyo, Japan",
                            "imageUrl": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
                            "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
                        },
                        {
                            "name": "Kyoto, Japan",
                            "imageUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
                            "description": "Known for its historic temples, gardens, and traditional tea houses."
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Brazil",
                    "cities": [
                        {
                            "name": "Rio de Janeiro, Brazil",
                            "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
                            "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
                        },
                        {
                            "name": "São Paulo, Brazil",
                            "imageUrl": "https://images.unsplash.com/photo-1541356665065-730319008837?w=800&q=80",
                            "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
                        }
                    ]
                }
            ],
            "temples": [
                {
                    "id": 1,
                    "name": "Angkor Wat, Cambodia",
                    "imageUrl": "https://images.unsplash.com/photo-1539367628448-4bc5c9ca613a?w=800&q=80",
                    "description": "A UNESCO World Heritage site and the largest religious monument in the world."
                },
                {
                    "id": 2,
                    "name": "Taj Mahal, India",
                    "imageUrl": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
                    "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
                }
            ],
            "beaches": [
                {
                    "id": 1,
                    "name": "Bora Bora, French Polynesia",
                    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
                    "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
                },
                {
                    "id": 2,
                    "name": "Copacabana Beach, Brazil",
                    "imageUrl": "https://images.unsplash.com/photo-1544378088-6d5c2b6c0e5d?w=800&q=80",
                    "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
                }
            ]
        };

        function searchDestinations() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            const resultsSection = document.getElementById('searchResults');
            const resultsGrid = document.getElementById('resultsGrid');
            const noResults = document.getElementById('noResults');
            const resultsText = document.getElementById('resultsText');

            if (!searchTerm) {
                alert('Please enter a search term');
                return;
            }

            let results = [];

            // Check for category searches first
            if (searchTerm.includes('beach') || searchTerm === 'beaches') {
                // Show all beaches
                travelData.beaches.forEach(beach => {
                    results.push({
                        type: 'beach',
                        ...beach
                    });
                });
            } else if (searchTerm.includes('temple') || searchTerm === 'temples') {
                // Show all temples
                travelData.temples.forEach(temple => {
                    results.push({
                        type: 'temple',
                        ...temple
                    });
                });
            } else if (searchTerm.includes('countr') || searchTerm === 'countries' || searchTerm.includes('cit') || searchTerm === 'cities') {
                // Show all cities
                travelData.countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.push({
                            type: 'city',
                            ...city
                        });
                    });
                });
            } else {
                // Original search logic for specific destinations
                
                // Search in cities
                travelData.countries.forEach(country => {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(searchTerm) || 
                            country.name.toLowerCase().includes(searchTerm)) {
                            results.push({
                                type: 'city',
                                ...city
                            });
                        }
                    });
                });

                // Search in temples
                travelData.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(searchTerm)) {
                        results.push({
                            type: 'temple',
                            ...temple
                        });
                    }
                });

                // Search in beaches
                travelData.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(searchTerm)) {
                        results.push({
                            type: 'beach',
                            ...beach
                        });
                    }
                });
            }

            // Display results
            resultsSection.classList.add('show');
            
            if (results.length > 0) {
                const categoryType = getCategoryType(searchTerm, results);
                resultsText.textContent = `Found ${results.length} ${categoryType}${results.length > 1 ? 's' : ''} for "${searchTerm}"`;
                noResults.style.display = 'none';
                resultsGrid.innerHTML = '';

                results.forEach((destination, index) => {
                    const card = createDestinationCard(destination);
                    card.style.animationDelay = `${index * 0.1}s`;
                    resultsGrid.appendChild(card);
                });
            } else {
                resultsText.textContent = `No results found for "${searchTerm}"`;
                noResults.style.display = 'block';
                resultsGrid.innerHTML = '';
            }
        }

        function getCategoryType(searchTerm, results) {
            if (searchTerm.includes('beach') || searchTerm === 'beaches') {
                return 'beach';
            } else if (searchTerm.includes('temple') || searchTerm === 'temples') {
                return 'temple';
            } else if (searchTerm.includes('countr') || searchTerm === 'countries' || searchTerm.includes('cit') || searchTerm === 'cities') {
                return 'city';
            } else if (results.length > 0) {
                return 'destination';
            }
            return 'result';
        }

        function clearSearch() {
            document.getElementById('searchInput').value = '';
            document.getElementById('searchResults').classList.remove('show');
            document.getElementById('resultsGrid').innerHTML = '';
            document.getElementById('noResults').style.display = 'none';
        }

        function createDestinationCard(destination) {
            const card = document.createElement('div');
            card.className = 'destination-card';
            
            const typeIcon = getTypeIcon(destination.type);
            
            card.innerHTML = `
                <div class="destination-image">
                    <img src="${destination.imageUrl}" alt="${destination.name}" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'">
                </div>
                <div class="card-content">
                    <h2>${typeIcon} ${destination.name}</h2>
                    <p>${destination.description}</p>
                    <button class="visit-btn" onclick="visitDestination('${destination.name}')">
                        <i class="fas fa-map-marker-alt"></i> Visit
                    </button>
                </div>
            `;
            
            return card;
        }

        function getTypeIcon(type) {
            switch(type) {
                case 'city': return '<i class="fas fa-city"></i>';
                case 'temple': return '<i class="fas fa-place-of-worship"></i>';
                case 'beach': return '<i class="fas fa-umbrella-beach"></i>';
                default: return '<i class="fas fa-map-marker-alt"></i>';
            }
        }

        function visitDestination(name) {
            alert(`Planning your visit to ${name}! 🌟`);
        }

        // Allow Enter key to search
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchDestinations();
            }
        });

        // Smooth scroll and animations
        document.addEventListener('DOMContentLoaded', function() {
            // Add loading animation
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });