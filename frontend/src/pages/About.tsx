import {
  Container,
  Title,
  Text,
  Card,
  SimpleGrid,
  ThemeIcon,
  Button,
  Badge,
  Stack,
  Divider,
  Center,
} from "@mantine/core";
import {
  IconLock,
  IconCloudUpload,
  IconShieldLock,
  IconCode,
  IconBrandGithub,
  IconArrowRight,
  IconDatabase,
  IconDeviceDesktop,
  IconApi,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      icon: IconLock,
      title: "AES-256 Encryption",
      description:
        "Server-side encryption using .NET Data Protection API with AES-256-CBC ensures your passwords are secured before storage.",
      color: "blue",
      gradient: { from: "blue", to: "cyan" },
    },
    {
      icon: IconCloudUpload,
      title: "Real-time Synchronization",
      description:
        "Seamless data sync across devices with conflict resolution and offline support.",
      color: "green",
      gradient: { from: "green", to: "teal" },
    },
    {
      icon: IconShieldLock,
      title: "JWT Authentication",
      description:
        "Stateless authentication with secure token management and automatic refresh.",
      color: "orange",
      gradient: { from: "orange", to: "red" },
    },
    {
      icon: IconCode,
      title: "Open Source",
      description:
        "Transparent codebase with modern development practices and comprehensive documentation.",
      color: "purple",
      gradient: { from: "purple", to: "pink" },
    },
  ];

  const techStack = [
    { name: "ASP.NET Core", type: "Backend API" },
    { name: "React + TypeScript", type: "Frontend" },
    { name: "Entity Framework", type: "ORM" },
    { name: "SQL Server", type: "Database" },
    { name: "Mantine UI", type: "Component Library" },
    { name: "JWT", type: "Authentication" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 overflow-x-hidden">
      <Container size="xl" py={40} className="px-4 sm:py-80">
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-2xl sm:blur-3xl opacity-20 scale-125 sm:scale-150 animate-pulse"></div>
            <ThemeIcon
              size={60}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="mx-auto relative z-10 shadow-xl mb-4 sm:mb-6"
            >
              <IconCode size={30} />
            </ThemeIcon>
          </div>

          <Title
            order={1}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4"
          >
            Built for Security & Performance
          </Title>
          <Center>
            <Text
              size="lg"
              className="mt-4 sm:mt-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed px-4"
              ta="center"
            >
              A full-stack password management solution demonstrating modern web
              development practices, secure data handling, and scalable
              architecture patterns.
            </Text>
          </Center>

          <div className="flex justify-center mt-8 sm:mt-10 px-4">
            <Button
              size="md"
              component="a"
              href="https://github.com/Viraj2313/password-manager"
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandGithub size={18} />}
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              View Source Code
            </Button>
          </div>
        </div>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="lg"
          mb={12}
          className="px-4 sm:px-0 sm:mb-16"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              shadow="xl"
              padding="lg"
              radius="xl"
              className="text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <ThemeIcon
                size={50}
                radius="xl"
                variant="gradient"
                gradient={feature.gradient}
                className="mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
              >
                <feature.icon size={24} />
              </ThemeIcon>

              <Title
                order={4}
                className="text-gray-900 dark:text-white mb-2 sm:mb-3 font-bold text-base sm:text-lg"
              >
                {feature.title}
              </Title>
              <Text size="sm" c="dimmed" className="leading-relaxed">
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-12 mb-12 sm:mb-16 border border-gray-200/50 dark:border-gray-700/50 shadow-lg mx-4 sm:mx-0">
          <div className="text-center mb-6 sm:mb-8">
            <Title
              order={2}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4"
            >
              Technology Stack
            </Title>
            <Text size="md" c="dimmed">
              Modern technologies chosen for security, performance, and
              maintainability
            </Text>
          </div>

          <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} spacing="md">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 hover:scale-105 transition-transform duration-300"
              >
                <Text
                  fw={600}
                  size="xs"
                  className="text-gray-900 dark:text-white mb-1 sm:text-sm"
                >
                  {tech.name}
                </Text>
                <Badge variant="light" size="xs" color="blue">
                  {tech.type}
                </Badge>
              </div>
            ))}
          </SimpleGrid>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
          <Card
            shadow="lg"
            padding="lg"
            radius="xl"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
          >
            <ThemeIcon
              size={40}
              radius="lg"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              className="mb-3 sm:mb-4"
            >
              <IconDeviceDesktop size={20} />
            </ThemeIcon>

            <Title
              order={4}
              className="mb-2 sm:mb-3 font-bold text-base sm:text-lg"
            >
              Frontend Layer
            </Title>
            <Text size="sm" c="dimmed" className="leading-relaxed">
              React application with TypeScript, featuring responsive design,
              real-time updates, and secure client-side encryption before data
              transmission.
            </Text>
          </Card>

          <Card
            shadow="lg"
            padding="lg"
            radius="xl"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
          >
            <ThemeIcon
              size={40}
              radius="lg"
              variant="gradient"
              gradient={{ from: "green", to: "teal" }}
              className="mb-3 sm:mb-4"
            >
              <IconApi size={20} />
            </ThemeIcon>

            <Title
              order={4}
              className="mb-2 sm:mb-3 font-bold text-base sm:text-lg"
            >
              API Layer
            </Title>
            <Text size="sm" c="dimmed" className="leading-relaxed">
              RESTful ASP.NET Core API with JWT authentication, input
              validation, rate limiting, and comprehensive error handling.
            </Text>
          </Card>

          <Card
            shadow="lg"
            padding="lg"
            radius="xl"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
          >
            <ThemeIcon
              size={40}
              radius="lg"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              className="mb-3 sm:mb-4"
            >
              <IconDatabase size={20} />
            </ThemeIcon>

            <Title
              order={4}
              className="mb-2 sm:mb-3 font-bold text-base sm:text-lg"
            >
              Data Layer
            </Title>
            <Text size="sm" c="dimmed" className="leading-relaxed">
              Entity Framework with SQL Server, featuring encrypted data
              storage, optimized queries, and proper database relationships.
            </Text>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-lg mx-4 sm:mx-0">
          <div className="max-w-4xl mx-auto">
            <Title
              order={2}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 text-center"
            >
              Development Objectives
            </Title>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" className="mt-4">
              <Stack gap="md">
                <div>
                  <Title
                    order={4}
                    className="text-gray-900 dark:text-white mb-2 text-sm sm:text-base"
                  >
                    🔐 Security Implementation
                  </Title>
                  <Text c="dimmed" size="sm">
                    Demonstrate secure coding practices including encryption,
                    authentication, and protection against common web
                    vulnerabilities.
                  </Text>
                </div>

                <div>
                  <Title
                    order={4}
                    className="text-gray-900 dark:text-white mb-2 text-sm sm:text-base"
                  >
                    🏗️ Architecture Design
                  </Title>
                  <Text c="dimmed" size="sm">
                    Showcase modern full-stack architecture with clean
                    separation of concerns, dependency injection, and testable
                    code structure.
                  </Text>
                </div>
              </Stack>

              <Stack gap="md">
                <div>
                  <Title
                    order={4}
                    className="text-gray-900 dark:text-white mb-2 text-sm sm:text-base"
                  >
                    ⚡ Performance Optimization
                  </Title>
                  <Text c="dimmed" size="sm">
                    Implement efficient data handling, caching strategies, and
                    optimized database queries for scalable performance.
                  </Text>
                </div>

                <div>
                  <Title
                    order={4}
                    className="text-gray-900 dark:text-white mb-2 text-sm sm:text-base"
                  >
                    🎨 User Experience
                  </Title>
                  <Text c="dimmed" size="sm">
                    Create an intuitive interface with responsive design,
                    accessibility features, and smooth user interactions.
                  </Text>
                </div>
              </Stack>
            </SimpleGrid>

            <Divider my="lg" />

            <div className="text-center">
              <Text c="dimmed" className="mb-4 sm:mb-6 text-sm sm:text-base">
                This project serves as a comprehensive demonstration of modern
                web development skills and security-focused programming
                practices.
              </Text>

              <Button
                component={Link}
                to="/signup"
                rightSection={<IconArrowRight size={14} />}
                variant="gradient"
                gradient={{ from: "blue", to: "purple", deg: 45 }}
                className="transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                size="md"
              >
                Try the Application
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
