document.addEventListener("DOMContentLoaded", () => {
  const table = new CustomTable();

  const convertToUGX = (usdPrice) => {
    const ugxPrice = Math.round(usdPrice * 3800);
    return ugxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sampleData = [
    {
      id: 1,
      customer: "John Doe",
      product: "Laptop",
      price: convertToUGX(999),
      status: "Approved",
      date: "03/18/2024",
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Smartphone",
      price: convertToUGX(699),
      status: "Pending",
      date: "03/16/2024",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      product: "Tablet",
      price: convertToUGX(499),
      status: "Rejected",
      date: "03/17/2024",
    },
    {
      id: 4,
      customer: "Sarah Williams",
      product: "Desktop PC",
      price: convertToUGX(1299),
      status: "Approved",
      date: "03/18/2024",
    },
    {
      id: 5,
      customer: "Michael Brown",
      product: "Wireless Earbuds",
      price: convertToUGX(199),
      status: "Pending",
      date: "03/19/2024",
    },
    {
      id: 6,
      customer: "Emily Davis",
      product: "Gaming Console",
      price: convertToUGX(499),
      status: "Approved",
      date: "03/20/2024",
    },
    {
      id: 7,
      customer: "David Miller",
      product: "Smart Watch",
      price: convertToUGX(299),
      status: "Rejected",
      date: "03/21/2024",
    },
    {
      id: 8,
      customer: "Lisa Anderson",
      product: "External Monitor",
      price: convertToUGX(399),
      status: "Approved",
      date: "03/22/2024",
    },
    {
      id: 9,
      customer: "James Wilson",
      product: "Wireless Mouse",
      price: convertToUGX(49),
      status: "Pending",
      date: "03/23/2024",
    },
    {
      id: 10,
      customer: "Jennifer Taylor",
      product: "Mechanical Keyboard",
      price: convertToUGX(149),
      status: "Approved",
      date: "03/24/2024",
    },
    {
      id: 11,
      customer: "Robert Martinez",
      product: "Graphics Card",
      price: convertToUGX(799),
      status: "Pending",
      date: "03/25/2024",
    },
    {
      id: 12,
      customer: "Patricia White",
      product: "Webcam",
      price: convertToUGX(79),
      status: "Approved",
      date: "03/26/2024",
    },
    {
      id: 13,
      customer: "Thomas Garcia",
      product: "USB-C Dock",
      price: convertToUGX(199),
      status: "Rejected",
      date: "03/27/2024",
    },
    {
      id: 14,
      customer: "Margaret Lee",
      product: "Printer",
      price: convertToUGX(299),
      status: "Approved",
      date: "03/28/2024",
    },
    {
      id: 15,
      customer: "Daniel Clark",
      product: "External SSD",
      price: convertToUGX(159),
      status: "Pending",
      date: "03/29/2024",
    },
    {
      id: 16,
      customer: "Sandra Hall",
      product: "Router",
      price: convertToUGX(129),
      status: "Approved",
      date: "03/30/2024",
    },
    {
      id: 17,
      customer: "Kevin Young",
      product: "Network Switch",
      price: convertToUGX(89),
      status: "Rejected",
      date: "03/31/2024",
    },
    {
      id: 18,
      customer: "Betty King",
      product: "UPS Battery Backup",
      price: convertToUGX(249),
      status: "Approved",
      date: "04/01/2024",
    },
    {
      id: 19,
      customer: "Richard Scott",
      product: "Wireless Keyboard",
      price: convertToUGX(89),
      status: "Pending",
      date: "04/02/2024",
    },
    {
      id: 20,
      customer: "Susan Green",
      product: "Gaming Mouse",
      price: convertToUGX(69),
      status: "Approved",
      date: "04/03/2024",
    },
    {
      id: 21,
      customer: "Joseph Baker",
      product: "Soundbar",
      price: convertToUGX(199),
      status: "Rejected",
      date: "04/04/2024",
    },
    {
      id: 22,
      customer: "Dorothy Nelson",
      product: "Wireless Speaker",
      price: convertToUGX(149),
      status: "Approved",
      date: "04/05/2024",
    },
    {
      id: 23,
      customer: "Christopher Hill",
      product: "Camera",
      price: convertToUGX(599),
      status: "Pending",
      date: "04/06/2024",
    },
    {
      id: 24,
      customer: "Ruth Carter",
      product: "Microphone",
      price: convertToUGX(129),
      status: "Approved",
      date: "04/07/2024",
    },
    {
      id: 25,
      customer: "Paul Mitchell",
      product: "Drawing Tablet",
      price: convertToUGX(299),
      status: "Rejected",
      date: "04/08/2024",
    },
    {
      id: 26,
      customer: "Sharon Roberts",
      product: "VR Headset",
      price: convertToUGX(399),
      status: "Approved",
      date: "04/09/2024",
    },
    {
      id: 27,
      customer: "Larry Turner",
      product: "NAS Storage",
      price: convertToUGX(499),
      status: "Pending",
      date: "04/10/2024",
    },
    {
      id: 28,
      customer: "Michelle Phillips",
      product: "Gaming Chair",
      price: convertToUGX(249),
      status: "Approved",
      date: "04/11/2024",
    },
    {
      id: 29,
      customer: "Steven Campbell",
      product: "Standing Desk",
      price: convertToUGX(599),
      status: "Rejected",
      date: "04/12/2024",
    },
    {
      id: 30,
      customer: "Carol Parker",
      product: "Ergonomic Mouse",
      price: convertToUGX(79),
      status: "Approved",
      date: "04/13/2024",
    },
    {
      id: 31,
      customer: "Kenneth Evans",
      product: "Mesh WiFi System",
      price: convertToUGX(299),
      status: "Pending",
      date: "04/14/2024",
    },
    {
      id: 32,
      customer: "Donna Edwards",
      product: "USB Hub",
      price: convertToUGX(39),
      status: "Approved",
      date: "04/15/2024",
    },
    {
      id: 33,
      customer: "Ronald Collins",
      product: "Portable Monitor",
      price: convertToUGX(249),
      status: "Rejected",
      date: "04/16/2024",
    },
    {
      id: 34,
      customer: "Helen Stewart",
      product: "Surge Protector",
      price: convertToUGX(29),
      status: "Approved",
      date: "04/17/2024",
    },
    {
      id: 35,
      customer: "Donald Morris",
      product: "Laptop Stand",
      price: convertToUGX(49),
      status: "Pending",
      date: "04/18/2024",
    },
    {
      id: 36,
      customer: "Maria Rogers",
      product: "Bluetooth Adapter",
      price: convertToUGX(19),
      status: "Approved",
      date: "04/19/2024",
    },
    {
      id: 37,
      customer: "Jerry Reed",
      product: "Cable Management Kit",
      price: convertToUGX(24),
      status: "Rejected",
      date: "04/20/2024",
    },
    {
      id: 38,
      customer: "Deborah Cook",
      product: "Webcam Light",
      price: convertToUGX(59),
      status: "Approved",
      date: "04/21/2024",
    },
    {
      id: 39,
      customer: "George Morgan",
      product: "Screen Protector",
      price: convertToUGX(14),
      status: "Pending",
      date: "04/22/2024",
    },
    {
      id: 40,
      customer: "Frances Cooper",
      product: "Laptop Cooling Pad",
      price: convertToUGX(34),
      status: "Approved",
      date: "04/23/2024",
    },
  ];

  table.setData(sampleData);
});