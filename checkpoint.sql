-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 30. 22:44
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `checkpoint`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `userId`) VALUES
(1, 'Admin A User', 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$3c2khECoxZOeJUq7Cl2EPQ$9QYtHacfAAkG2QCyO/eJgglJ12KJnqQSJSzfyyNiOlY', 1),
(2, 'New Lajos', 'lajos@example.com', '$argon2id$v=19$m=65536,t=3,p=4$+5BBt7igmuoJfeKQ4Jmxug$RcO+N606CKYgFeF8uJJJCbU+FNsDYVleYemU6YHm05Y', 5),
(5, 'New User Lajoska', 'lajoska2.testes@example.com', '$argon2id$v=19$m=65536,t=3,p=4$owNQT7iIzdeDbUMIE/PvJQ$ZBeK3nJDbi6WOBnLsGFFiS6C4hsIGvRgPKF+B2K/30U', 9);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `entryexitevent`
--

CREATE TABLE `entryexitevent` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `portaId` int(11) DEFAULT NULL,
  `action` varchar(191) NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `entryexitevent`
--

INSERT INTO `entryexitevent` (`id`, `userId`, `studentId`, `portaId`, `action`, `timestamp`) VALUES
(1, 3, 1, 1, 'kiment', '2025-04-29 11:54:30.793'),
(2, 3, 1, 1, 'bejött', '2025-04-29 11:54:30.793'),
(3, 1, 1, 1, 'kiment', '2025-04-29 11:54:30.793'),
(4, 1, 1, 1, 'bejött', '2025-04-29 11:54:30.793'),
(5, 1, 1, 1, 'kiment', '2025-04-29 11:54:30.793'),
(6, 1, 1, 1, 'bejött', '2025-04-29 11:54:30.793'),
(7, 1, 1, 1, 'kiment', '2025-04-29 11:54:30.793'),
(8, 1, 1, 1, 'bejött', '2025-04-29 11:54:30.793'),
(9, 1, 1, 1, 'kiment', '2025-04-29 11:54:30.793'),
(10, 1, 1, 1, 'bejött', '2025-04-29 11:54:30.793');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `porta`
--

CREATE TABLE `porta` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `porta`
--

INSERT INTO `porta` (`id`, `name`, `email`, `password`, `userId`) VALUES
(1, 'Porta User', 'porta@example.com', '$argon2id$v=19$m=65536,t=3,p=4$K6a0YGdUv4oKJ1+lLn5Xjw$fu9K8hUUB53fTGXCt9OlGVTJ8lIe4w3Xdk2yDaPSqvI', 4),
(2, 'Porta User', 'porta2@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Z3AwCQ35XX9VLbTv8G8GwA$Ns9n+n7l8J4ImrdxQclApLFEyCcz3W+dRYt+ecIuOuI', 11);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `licenseKey` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `licenseKey` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `smokingevent`
--

CREATE TABLE `smokingevent` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `smokingevent`
--

INSERT INTO `smokingevent` (`id`, `userId`, `startTime`, `endTime`) VALUES
(1, 1, '2025-04-29 11:54:30.793', '2025-04-29 11:59:30.793'),
(2, 2, '2025-04-29 11:54:30.793', '2025-04-29 12:04:30.793'),
(3, 3, '2025-04-29 11:54:30.793', '2025-04-29 12:09:30.793'),
(4, 4, '2025-04-29 11:54:30.793', '2025-04-29 12:14:30.793'),
(5, 5, '2025-04-29 11:54:30.793', '2025-04-29 12:19:30.793'),
(6, 1, '2025-04-29 11:54:30.793', '2025-04-29 12:24:30.793'),
(7, 2, '2025-04-29 11:54:30.793', '2025-04-29 12:29:30.793'),
(8, 3, '2025-04-29 11:54:30.793', '2025-04-29 12:34:30.793'),
(9, 4, '2025-04-29 11:54:30.793', '2025-04-29 12:39:30.793'),
(10, 5, '2025-04-29 11:54:30.793', '2025-04-29 12:44:30.793');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `class` varchar(191) NOT NULL,
  `classTeacherId` int(11) NOT NULL,
  `birthDate` datetime(3) NOT NULL,
  `studentCardNumber` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `student`
--

INSERT INTO `student` (`id`, `name`, `class`, `classTeacherId`, `birthDate`, `studentCardNumber`, `email`, `password`, `userId`) VALUES
(1, 'Student User', '10A', 1, '2005-01-01 00:00:00.000', '73253223532', 'student@example.com', '$argon2id$v=19$m=65536,t=3,p=4$FRTtiKdNSBKYWP+RH09PJw$WM1tadCO8q4p3PAZo8O7pVgDXGs/Ei0Arntc3D6y88I', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `class` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `class`, `email`, `password`, `userId`) VALUES
(1, 'Teacher User', '10A', 'teacher@example.com', '$argon2id$v=19$m=65536,t=3,p=4$tiVqBgf/sd8IhJTpZ4gkrA$wGXVFTx2V8TJuJviyb/1bxw/i4XiJXmXDCsC0Qe4guY', 2),
(3, 'Teacher User', '11A', 'teacher2@example.com', '$argon2id$v=19$m=65536,t=3,p=4$AH+N9K22flDr4LIbqD0EKw$rVgMNhVPWnKklbDM4Y/jcAAl9Xs9+4YHgzwXl6aQo+A', 12);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('ADMIN','TEACHER','STUDENT','PORTA') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$3c2khECoxZOeJUq7Cl2EPQ$9QYtHacfAAkG2QCyO/eJgglJ12KJnqQSJSzfyyNiOlY', 'ADMIN'),
(2, 'teacher@example.com', '$argon2id$v=19$m=65536,t=3,p=4$tiVqBgf/sd8IhJTpZ4gkrA$wGXVFTx2V8TJuJviyb/1bxw/i4XiJXmXDCsC0Qe4guY', 'TEACHER'),
(3, 'student@example.com', '$argon2id$v=19$m=65536,t=3,p=4$FRTtiKdNSBKYWP+RH09PJw$WM1tadCO8q4p3PAZo8O7pVgDXGs/Ei0Arntc3D6y88I', 'STUDENT'),
(4, 'porta@example.com', '$argon2id$v=19$m=65536,t=3,p=4$K6a0YGdUv4oKJ1+lLn5Xjw$fu9K8hUUB53fTGXCt9OlGVTJ8lIe4w3Xdk2yDaPSqvI', 'PORTA'),
(5, 'lajos@example.com', '$argon2id$v=19$m=65536,t=3,p=4$+5BBt7igmuoJfeKQ4Jmxug$RcO+N606CKYgFeF8uJJJCbU+FNsDYVleYemU6YHm05Y', 'ADMIN'),
(9, 'lajoska2.testes@example.com', '$argon2id$v=19$m=65536,t=3,p=4$owNQT7iIzdeDbUMIE/PvJQ$ZBeK3nJDbi6WOBnLsGFFiS6C4hsIGvRgPKF+B2K/30U', 'ADMIN'),
(11, 'porta2@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Z3AwCQ35XX9VLbTv8G8GwA$Ns9n+n7l8J4ImrdxQclApLFEyCcz3W+dRYt+ecIuOuI', 'PORTA'),
(12, 'teacher2@example.com', '$argon2id$v=19$m=65536,t=3,p=4$AH+N9K22flDr4LIbqD0EKw$rVgMNhVPWnKklbDM4Y/jcAAl9Xs9+4YHgzwXl6aQo+A', 'TEACHER');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`),
  ADD UNIQUE KEY `Admin_userId_key` (`userId`);

--
-- A tábla indexei `entryexitevent`
--
ALTER TABLE `entryexitevent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EntryExitEvent_userId_fkey` (`userId`),
  ADD KEY `EntryExitEvent_studentId_fkey` (`studentId`),
  ADD KEY `EntryExitEvent_portaId_fkey` (`portaId`);

--
-- A tábla indexei `porta`
--
ALTER TABLE `porta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Porta_email_key` (`email`),
  ADD UNIQUE KEY `Porta_userId_key` (`userId`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_licenseKey_key` (`licenseKey`);

--
-- A tábla indexei `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Register_licenseKey_key` (`licenseKey`),
  ADD KEY `Register_userId_fkey` (`userId`),
  ADD KEY `Register_productId_fkey` (`productId`);

--
-- A tábla indexei `smokingevent`
--
ALTER TABLE `smokingevent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SmokingEvent_userId_fkey` (`userId`);

--
-- A tábla indexei `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Student_studentCardNumber_key` (`studentCardNumber`),
  ADD UNIQUE KEY `Student_email_key` (`email`),
  ADD UNIQUE KEY `Student_userId_key` (`userId`),
  ADD KEY `Student_classTeacherId_fkey` (`classTeacherId`);

--
-- A tábla indexei `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Teacher_email_key` (`email`),
  ADD UNIQUE KEY `Teacher_userId_key` (`userId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `entryexitevent`
--
ALTER TABLE `entryexitevent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `porta`
--
ALTER TABLE `porta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `smokingevent`
--
ALTER TABLE `smokingevent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `entryexitevent`
--
ALTER TABLE `entryexitevent`
  ADD CONSTRAINT `EntryExitEvent_portaId_fkey` FOREIGN KEY (`portaId`) REFERENCES `porta` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `EntryExitEvent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `EntryExitEvent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `porta`
--
ALTER TABLE `porta`
  ADD CONSTRAINT `Porta_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `register`
--
ALTER TABLE `register`
  ADD CONSTRAINT `Register_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Register_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `smokingevent`
--
ALTER TABLE `smokingevent`
  ADD CONSTRAINT `SmokingEvent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `Student_classTeacherId_fkey` FOREIGN KEY (`classTeacherId`) REFERENCES `teacher` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `Teacher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
