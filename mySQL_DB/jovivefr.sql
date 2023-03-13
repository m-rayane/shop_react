-- Database : `jovivefr`
--
-- --------------------------------------------------------
--
-- Table `users`
--

CREATE TABLE `users` (
  `id` INT(10) PRIMARY KEY AUTO_INCREMENT,
  `createdDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `phoneNumber` INT(10),
  `address` VARCHAR(255),
  `zipCode` INT(5),
  `city` VARCHAR(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- --------------------------------------------------------
--
-- Table `products`
--

CREATE TABLE `products` (
  `id` VARCHAR(50) PRIMARY KEY,
  `createdDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `technical` TEXT NOT NULL,
  `price` FLOAT(10) NOT NULL,
  `weight` INT(10) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `stock` INT(10),
  `image` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- --------------------------------------------------------
--
-- Table `product_options`
--

CREATE TABLE `product_options` (
  `id` INT(10) PRIMARY KEY AUTO_INCREMENT,
  `productId` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` FLOAT(10) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- --------------------------------------------------------
--
-- Table `productImages`
--

CREATE TABLE `product_images` (
  `id` INT(10) PRIMARY KEY,
  `productId` INT(10) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `alt` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Table `orders`
--

CREATE TABLE `orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `createdDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `userId` INT(10) NOT NULL,
  `statut` VARCHAR(50) NOT NULL,
  `totalPrice` FLOAT(10) NOT NULL,  
  `updatedDate` DATETIME,
  `shippingAddress` VARCHAR(255) NOT NULL,
  `shippingNumber` VARCHAR(50),
  `shippingDate` DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------
--
-- Table `orderProduct`
--

CREATE TABLE `order_details` (
  `id` INT(10) PRIMARY KEY AUTO_INCREMENT,
  `orderId` VARCHAR(50) NOT NULL,
  `productId` VARCHAR(50) NOT NULL,
  `quantity` INT(10) NOT NULL,
  `priceUnit` FLOAT(10) NOT NULL,
  `discount` INT(10)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Table `shippingAddress`
--

CREATE TABLE `shipping_address` (
  `id` INT(10) PRIMARY KEY AUTO_INCREMENT,
  `userId` INT(10) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `phoneNumber` INT(10),
  `address` VARCHAR(255) NOT NULL,
  `zipCode` INT(5) NOT NULL,
  `city` VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------
--
-- Table `shippings`
--

CREATE TABLE `shippings` (
  `id` VARCHAR(50) PRIMARY KEY,
  `orderId` INT(10) NOT NULL,
  `userId` INT(10) NOT NULL,
  `type` VARCHAR(10) NOT NULL,
  `price` FLOAT(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table `reviews`
--

CREATE TABLE `reviews` (
  `id` INT(10) PRIMARY KEY,
  `productId` INT(11) NOT NULL,  
  `userId` INT(11) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `createdDate` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
--Table `ratings`
--

CREATE TABLE `ratings` (
  `rating` INT(5) NOT NULL,
  `productId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



