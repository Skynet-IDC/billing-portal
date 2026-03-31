'use server'

export const getInstanceData = async (email: string, password: string) => {
  try {
    // Vars
    const res = await fetch(`${process.env.BACKEND_URL}/api/vm/owner?ownerId=49`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    console.log('Response login: => ' + JSON.stringify({ status: res.status, statusText: res.statusText, data: data }))

  } catch (error) {
    console.error('getInstanceData Error:', error)
  }

  return [
    {
      id: 33,
      hostname: 'Span',
      serviceName: 'VPS',
      category: 'Shoes',
      stock: false,
      sku: 33523,
      price: '$600.43',
      qty: 622,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-13.png',
      instanceBrand: 'Jerde-Walsh'
    },
    {
      id: 34,
      hostname: 'Rank',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: false,
      sku: 60307,
      price: '$337.90',
      qty: 896,
      status: 'Scheduled',
      image: '/images/apps/ecommerce/product-14.png',
      instanceBrand: 'Barrows, Quitzon and Roberts'
    },
    {
      id: 35,
      hostname: 'Tempsoft',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: true,
      sku: 75059,
      price: '$959.47',
      qty: 239,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-15.png',
      instanceBrand: 'Russel-Grant'
    },
    {
      id: 36,
      hostname: 'Ventosanzap',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: true,
      sku: 69072,
      price: '$756.81',
      qty: 410,
      status: 'Scheduled',
      image: '/images/apps/ecommerce/product-16.png',
      instanceBrand: "O'Conner-Zboncak"
    },
    {
      id: 37,
      hostname: 'Mat Lam Tam',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: false,
      sku: 68290,
      price: '$256.86',
      qty: 630,
      status: 'Published',
      image: '/images/apps/ecommerce/product-17.png',
      instanceBrand: 'Rutherford, Heller and Bashirian'
    },
    {
      id: 38,
      hostname: 'Zamit',
      serviceName: 'VPS',
      category: 'Shoes',
      stock: true,
      sku: 89552,
      price: '$378.54',
      qty: 247,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-18.png',
      instanceBrand: 'Swift-Altenwerth'
    },
    {
      id: 39,
      hostname: 'Tresom',
      serviceName: 'VPS',
      category: 'Shoes',
      stock: true,
      sku: 50863,
      price: '$166.17',
      qty: 672,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-19.png',
      instanceBrand: "O'Kon, Waelchi and Lesch"
    },
    {
      id: 40,
      hostname: 'Viva',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: false,
      sku: 90484,
      price: '$745.76',
      qty: 697,
      status: 'Published',
      image: '/images/apps/ecommerce/product-20.png',
      instanceBrand: 'Johnston, Anderson and Metz'
    },
    {
      id: 41,
      hostname: 'Matsoft',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: true,
      sku: 76980,
      price: '$603.16',
      qty: 74,
      status: 'Published',
      image: '/images/apps/ecommerce/product-1.png',
      instanceBrand: "O'Conner, Paucek and Braun"
    },
    {
      id: 42,
      hostname: 'Wiodex',
      serviceName: 'VPS',
      category: 'Home Decor',
      stock: true,
      sku: 66971,
      price: '$772.51',
      qty: 280,
      status: 'Published',
      image: '/images/apps/ecommerce/product-2.png',
      instanceBrand: 'Wisoky-Kassulke'
    },
    {
      id: 43,
      hostname: 'Keylex',
      serviceName: 'VPS',
      category: 'Shoes',
      stock: false,
      sku: 16589,
      price: '$986.22',
      qty: 758,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-3.png',
      instanceBrand: 'Haag, Bruen and Reichel'
    },
    {
      id: 44,
      hostname: 'Konklux',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: true,
      sku: 73896,
      price: '$988.47',
      qty: 14,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-4.png',
      instanceBrand: 'Ankunding Inc'
    },
    {
      id: 45,
      hostname: 'Tresom',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: false,
      sku: 67489,
      price: '$946.62',
      qty: 35,
      status: 'Inactive',
      image: '/images/apps/ecommerce/product-5.png',
      instanceBrand: 'Deckow and Sons'
    },
    {
      id: 46,
      hostname: 'Quo Lux',
      serviceName: 'VPS',
      category: 'Shoes',
      stock: true,
      sku: 48177,
      price: '$224.28',
      qty: 935,
      status: 'Scheduled',
      image: '/images/apps/ecommerce/product-1.png',
      instanceBrand: 'Kreiger, Reynolds and Sporer'
    },
    {
      id: 47,
      hostname: 'Roldlamis',
      serviceName: 'VPS',
      category: 'Home Decor',
      stock: true,
      sku: 225,
      price: '$952.14',
      qty: 361,
      status: 'Published',
      image: '/images/apps/ecommerce/product-6.png',
      instanceBrand: 'Kuphal-Abbott'
    },
    {
      id: 48,
      hostname: 'Tampflex',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: false,
      sku: 29438,
      price: '$646.21',
      qty: 908,
      status: 'Scheduled',
      image: '/images/apps/ecommerce/product-7.png',
      instanceBrand: 'Romaguera, Schmeler and Volkman'
    },
    {
      id: 49,
      hostname: 'Span',
      serviceName: 'VPS',
      category: 'Home Decor',
      stock: true,
      sku: 55666,
      price: '$583.13',
      qty: 898,
      status: 'Scheduled',
      image: '/images/apps/ecommerce/product-1.png',
      instanceBrand: 'Hane-Romaguera'
    },
    {
      id: 50,
      hostname: 'Zamit',
      serviceName: 'VPS',
      category: 'Accessories',
      stock: false,
      sku: 55860,
      price: '$273.67',
      qty: 332,
      status: 'Published',
      image: '/images/apps/ecommerce/product-9.png',
      instanceBrand: 'Hoeger-Powlowski'
    }
  ];
}

