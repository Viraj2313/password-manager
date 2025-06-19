import {
  Button,
  Card,
  Title,
  Text,
  Container,
  Center,
  Group,
  Badge,
  ThemeIcon,
  Loader,
} from "@mantine/core";
import {
  IconLock,
  IconCloud,
  IconCode,
  IconBrandGithub,
  IconPlus,
  IconShield,
  IconFingerprint,
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import type { PasswordEntry } from "../types/password";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

function Home() {
  const { userId, authLoading } = useUser();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get("/api/passwords/get-passwords", {
          withCredentials: true,
        });
        setPasswords(res.data);
      } catch (err) {
        console.error("Error fetching passwords:", err);
      }
    };

    if (userId) fetchPasswords();
  }, [userId]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 scale-125 animate-pulse"></div>
            <ThemeIcon
              size={80}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="mx-auto relative z-10 shadow-xl mb-4"
            >
              <IconLock size={40} />
            </ThemeIcon>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Loader size="md" variant="bars" color="blue" />
            <Text size="lg" c="dimmed" className="font-medium">
              Loading your secure vault...
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return userId ? (
    passwords.length === 0 ? (
      <div className="h-screen flex items-center justify-between bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 px-4 overflow-x-hidden flex-col pb-12">
        <div className="text-center space-y-4 p-4 max-w-md mx-auto mt-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 scale-125 animate-pulse"></div>
            <ThemeIcon
              size={80}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="mx-auto relative z-10 shadow-xl mb-4"
            >
              <IconLock size={40} />
            </ThemeIcon>
          </div>

          <div className="space-y-3">
            <Title
              order={2}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Your vault awaits
            </Title>
            <Text size="md" c="dimmed" className="leading-relaxed">
              Start building your secure password collection. Every journey
              begins with a single step.
            </Text>
          </div>

          <Button
            size="md"
            leftSection={<IconPlus size={18} />}
            rightSection={<IconArrowRight size={14} />}
            component={Link}
            to="/add-password"
            variant="gradient"
            gradient={{ from: "blue", to: "purple", deg: 45 }}
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Add Your First Password
          </Button>
        </div>
        <Footer />
      </div>
    ) : (
      <div className="overflow-x-hidden">
        <Container size="xl" className="mt-4 sm:mt-8 pb-8 sm:pb-12 px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <ThemeIcon
                  size={40}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "blue", to: "purple", deg: 45 }}
                >
                  <IconShield size={20} />
                </ThemeIcon>
                <div>
                  <Title
                    order={2}
                    className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    Your Secure Vault
                  </Title>
                  <Group gap="xs" mt={2}>
                    <Badge variant="light" color="blue" size="sm">
                      {passwords.length} passwords
                    </Badge>
                    <Badge variant="light" color="green" size="sm">
                      <IconShield size={12} />
                      Encrypted
                    </Badge>
                  </Group>
                </div>
              </div>

              <Button
                size="sm"
                leftSection={<IconPlus size={16} />}
                component={Link}
                to="/add-password"
                variant="gradient"
                gradient={{ from: "blue", to: "purple", deg: 45 }}
                className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Add Password
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {passwords.map((pwd, index) => (
              <Card
                key={pwd.id}
                shadow="lg"
                padding="lg"
                radius="xl"
                withBorder
                component={Link}
                to={`/password/${pwd.id}`}
                className="hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <ThemeIcon
                    size={36}
                    radius="lg"
                    variant="light"
                    color="blue"
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <IconFingerprint size={18} />
                  </ThemeIcon>
                  <IconArrowRight
                    size={14}
                    className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                <Text
                  fw={600}
                  size="md"
                  className="group-hover:text-blue-600 transition-colors duration-300 truncate"
                >
                  {pwd.site}
                </Text>

                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Text size="xs" c="dimmed">
                    Secure & Encrypted
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    )
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 overflow-x-hidden">
      <Container size="lg" className="pt-8 sm:pt-20 pb-8 sm:pb-12 px-4">
        <section className="text-center mb-12 sm:mb-20">
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-2xl sm:blur-3xl opacity-20 scale-125 sm:scale-150 animate-pulse"></div>
            <ThemeIcon
              size={80}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="mx-auto relative z-10 shadow-xl mb-4 sm:mb-6"
            >
              <IconSparkles size={40} />
            </ThemeIcon>
          </div>

          <Title
            order={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4"
          >
            Secure Password Management
          </Title>
          <Center>
            <Text
              size="lg"
              className="mt-4 sm:mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center px-4 leading-relaxed"
            >
              Password management with
              <span className="font-semibold text-blue-600"> encryption </span>
              and modern web architecture.
            </Text>
          </Center>

          <div className="flex flex-col sm:flex-row justify-center mt-8 sm:mt-12 gap-4 px-4">
            <Button
              size="lg"
              component={Link}
              to="/signup"
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              rightSection={<IconArrowRight size={18} />}
              className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              component={Link}
              to="/about"
              className="border-2 hover:bg-blue-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Explore Features
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20 px-4">
          {[
            {
              icon: IconLock,
              title: "AES-256 Encryption",
              description:
                "Industry-standard encryption with zero-knowledge architecture ensures complete data privacy.",
              color: "blue",
              gradient: { from: "blue", to: "cyan" },
            },
            {
              icon: IconCloud,
              title: "Cross-Platform Sync",
              description:
                "Real-time synchronization across devices with offline support and conflict resolution.",
              color: "green",
              gradient: { from: "green", to: "teal" },
            },
            {
              icon: IconCode,
              title: "Modern Tech Stack",
              description:
                "Built with ASP.NET Core API and React, featuring JWT authentication and secure data handling.",
              color: "purple",
              gradient: { from: "purple", to: "pink" },
            },
          ].map((feature, index) => (
            <Card
              key={index}
              shadow="xl"
              padding="lg"
              radius="xl"
              className="text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              <div className="relative mb-4 sm:mb-6">
                <ThemeIcon
                  size={50}
                  radius="xl"
                  variant="gradient"
                  gradient={feature.gradient}
                  className="mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                >
                  <feature.icon size={24} />
                </ThemeIcon>
              </div>

              <Title
                order={4}
                className="text-gray-900 dark:text-white mb-3 sm:mb-4 font-bold text-lg"
              >
                {feature.title}
              </Title>
              <Text size="sm" c="dimmed" className="leading-relaxed">
                {feature.description}
              </Text>
            </Card>
          ))}
        </section>

        <section className="text-center max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <Title
              order={2}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6"
            >
              Technical Implementation
            </Title>
            <Text className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              A full-stack demonstration of modern web development practices,
              featuring secure authentication, encrypted data storage, and
              responsive UI design patterns.
            </Text>

            <Button
              component="a"
              href="https://github.com/Viraj2313/password-manager"
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandGithub size={18} />}
              variant="outline"
              size="md"
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto mt-4"
            >
              View Source Code
            </Button>
          </div>
        </section>

        <Footer />
      </Container>
    </div>
  );
}

export default Home;
