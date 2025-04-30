-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 30. 23:04
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
(1, 'Admin User', 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$QBt37GFVQ3lHcyLFnFeBaw$t0sqGPEIugNQ3GKQctnlrKzcI2GRW+jVh04s3HENXro', 1);

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
(1, 1, NULL, NULL, 'kiment', '2025-04-30 20:58:08.968'),
(2, 1, NULL, NULL, 'bejött', '2025-04-30 20:58:08.968'),
(3, 2, NULL, NULL, 'kiment', '2025-04-30 20:58:08.968'),
(4, 2, NULL, NULL, 'bejött', '2025-04-30 20:58:08.968'),
(5, 3, NULL, NULL, 'kiment', '2025-04-30 20:58:08.968'),
(6, 3, NULL, NULL, 'bejött', '2025-04-30 20:58:08.968'),
(7, 4, NULL, NULL, 'kiment', '2025-04-30 20:58:08.968'),
(8, 4, NULL, NULL, 'bejött', '2025-04-30 20:58:08.968');

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
(1, 'Porta User', 'porta@example.com', '$argon2id$v=19$m=65536,t=3,p=4$bKumUthXWb+rt7HGCEJOkg$nOeTClBF2YvCvQcNbfRZ5cRJddyAFGdqYG/BHcgVlYA', 4);

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
(1, 'Student User', '10A', 1, '2005-01-01 00:00:00.000', '123456789', 'student@example.com', '$argon2id$v=19$m=65536,t=3,p=4$bRJSFjT1o5j5PnQihTopyA$B0Tj6l0cwP1Jozsaqun4Q00onHdG5DqVv+s+tOxd2dc', 3);

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
(1, 'Teacher User', '10A', 'teacher@example.com', '$argon2id$v=19$m=65536,t=3,p=4$JlVfsiTSLZWscAI6t7CsxA$s699TxdyZ+YVSGUzLg/BEMQfm303eycgzlg9TlOB29g', 2);

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
(1, 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$QBt37GFVQ3lHcyLFnFeBaw$t0sqGPEIugNQ3GKQctnlrKzcI2GRW+jVh04s3HENXro', 'ADMIN'),
(2, 'teacher@example.com', '$argon2id$v=19$m=65536,t=3,p=4$JlVfsiTSLZWscAI6t7CsxA$s699TxdyZ+YVSGUzLg/BEMQfm303eycgzlg9TlOB29g', 'TEACHER'),
(3, 'student@example.com', '$argon2id$v=19$m=65536,t=3,p=4$bRJSFjT1o5j5PnQihTopyA$B0Tj6l0cwP1Jozsaqun4Q00onHdG5DqVv+s+tOxd2dc', 'STUDENT'),
(4, 'porta@example.com', '$argon2id$v=19$m=65536,t=3,p=4$bKumUthXWb+rt7HGCEJOkg$nOeTClBF2YvCvQcNbfRZ5cRJddyAFGdqYG/BHcgVlYA', 'PORTA');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `entryexitevent`
--
ALTER TABLE `entryexitevent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `porta`
--
ALTER TABLE `porta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
