const sections = {
    "Video Games": [
      {
        name: "Tales of Zestiria",
        price: "2.83",
        priority: 3,
        link: "https://example.com/game-console",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEju9EXrY8GwurVlxB91w-OVGViz7bFASgClixC_fHqkJGsIHvmJqc7-SiC3Bat_0zt2k405D0iL3LhNs9HO-UvNfd1ieXGXdUJMJBxipZr1rQf7yMHEzwswaOtQufZjeeNjkXEwseBf846Z/s640/Zestiria.jpg"
      },
      {
        name: "Dark Souls 3",
        price: "22.99",
        priority: 5,
        link: "https://example.com/latest-game",
        image: "https://static.bandainamcoent.eu/high/dark-souls/dark-souls-3/00-page-setup/ds3_game-thumbnail.jpg"
      },
      {
        name: "Bayoneta",
        price: "4.88",
        priority: 3,
        link: "https://example.com/latest-game",
        image: "https://gaming-cdn.com/images/products/2029/616x353/bayonetta-pc-juego-steam-cover.jpg?v=1666601337"
      },
      {
        name: "Tales of Arise",
        price: "9.99",
        priority: 4,
        link: "https://example.com/latest-game",
        image: "https://i.blogs.es/166345/tales-of-arise-01/1366_2000.jpeg"
      },
      {
        name: "The Last Of US",
        price: "34.64",
        priority: 4,
        link: "https://example.com/latest-game",
        image: "https://cdn1.epicgames.com/offer/0c40923dd1174a768f732a3b013dcff2/EGS_UpgradetoDigitalDeluxeEdition_NaughtyDogLLC_AddOn_S1_2560x1440-d0195796f9b15e41ee69393bb95c4edc"
      }
    ],
  
  
    "Gadgets": [
      {
        name: "Iphone 13",
        price: "394",
        priority: 5,
        link: "https://example.com/tshirt",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-pro-max-blue-2023?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1679072989205"
      },
      {
        name: "Sony XM4",
        price: "229",
        priority: 4,
        link: "https://example.com/jeans",
        image: "https://www.sony.es/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"
      },
      {
        name: "Razer Huntsman Mini",
        price: "229",
        priority: 4,
        link: "https://example.com/jeans",
        image: "https://m.media-amazon.com/images/I/51RCPbsnWqL._AC_SL1200_.jpg"
      },
      {
        name: "Xbox Elite Series",
        price: "112",
        priority: 4,
        link: "https://example.com/jeans",
        image: "https://thumb.pccomponentes.com/w-530-530/articles/1058/10586654/2614-microsoft-xbox-elite-series-2-core-mando-inalambrico-blanco-comprar.jpg"
      }
    ],
    "Clothes": [
      {
        name: "T-Shirt",
        price: "25",
        priority: 3,
        link: "https://example.com/tshirt",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
      },
      {
        name: "Jeans",
        price: "50",
        priority: 2,
        link: "https://example.com/jeans",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
      }
    ]
  };
  
  
  const manualList = document.getElementById('manual-list');
  const sortSelect = document.getElementById('sort-select');
  const loadingSpinner = document.getElementById('loading-spinner');
  
  
  const showLoading = () => {
    loadingSpinner.style.display = 'block';
  };
  
  
  const hideLoading = () => {
    loadingSpinner.style.display = 'none';
  };
  
  
  const sortItemsByPrice = (items, order) => {
    return items.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  };
  
  
  const sortItemsByPriority = (items, order) => {
    return items.sort((a, b) => {
      return order === 'asc' ? a.priority - b.priority : b.priority - a.priority;
    });
  };
  
  
  const renderWishlist = (sortFunction, order) => {
    manualList.innerHTML = '';
    showLoading();
  
  
    setTimeout(() => {
      Object.entries(sections).forEach(([sectionName, items]) => {
        const sectionHeader = document.createElement('h2');
        sectionHeader.innerText = sectionName;
        manualList.appendChild(sectionHeader);
  
  
        const sortedItems = sortFunction(items, order);
  
  
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('wishlist-grid');
  
  
        sortedItems.forEach(item => {
          const itemCard = document.createElement('div');
          itemCard.classList.add('item-card');
  
  
          let starRating = '';
          for (let i = 1; i <= 5; i++) {
            starRating += `<span class="star ${i <= item.priority ? 'filled' : ''}">&#9733;</span>`;
          }
  
  
          itemCard.innerHTML = `
            <div class="img-container"><img src="${item.image}" alt="${item.name}" /></div>
            <h3>${item.name}</h3>
            <p>${item.price} €</p>
            <div class="star-rating">${starRating}</div> <!-- Insert the star rating -->
            <a href="${item.link}" target="_blank">View</a>
          `;
  
  
          gridContainer.appendChild(itemCard);
        });
        manualList.appendChild(gridContainer);
      });
  
  
      hideLoading();
    }, 1000);
  };
  
  
  renderWishlist(sortItemsByPriority, 'desc');
  
  
  sortSelect.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    let sortFunction;
    let order;
  
  
    switch (selectedValue) {
      case 'price-asc':
        sortFunction = sortItemsByPrice;
        order = 'asc';
        break;
      case 'price-desc':
        sortFunction = sortItemsByPrice;
        order = 'desc';
        break;
      case 'priority-asc':
        sortFunction = sortItemsByPriority;
        order = 'asc';
        break;
      case 'priority-desc':
        sortFunction = sortItemsByPriority;
        order = 'desc';
        break;
    }
  
  
    renderWishlist(sortFunction, order);
  });  