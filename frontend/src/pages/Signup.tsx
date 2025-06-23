import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Anchor,
  Stack,
  ThemeIcon,
} from "@mantine/core";
import { IconUserPlus, IconMail, IconKey, IconUser } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userId, setUserId } = useUser();
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "/api/signup",
        { name, email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Signed up successfully!");
        setUserId(res.data.userId);
        navigate("/");
      }
    } catch (err) {
      toast.error("Please try again!");
      console.error(err);
    }
  };
  if (userId) {
    navigate("/");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center pt-8 px-4 overflow-x-hidden">
      <Container size="sm" className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl sm:blur-2xl opacity-20 scale-125 sm:scale-150 animate-pulse"></div>
            <ThemeIcon
              size={50}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="mx-auto relative z-10 shadow-xl"
            >
              <IconUserPlus size={24} />
            </ThemeIcon>
          </div>

          <Title
            order={1}
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Create Your Account
          </Title>
          <Text
            size="md"
            className="text-gray-600 dark:text-gray-300 mx-auto leading-relaxed"
            ta="center"
          >
            Sign up to securely manage your passwords with enterprise-grade
            encryption.
          </Text>
        </div>

        <Paper
          shadow="xl"
          radius="xl"
          p="xl"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500"
        >
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              required
              size="md"
              leftSection={<IconUser size={18} className="text-gray-400" />}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <TextInput
              label="Email Address"
              placeholder="you@example.com"
              required
              size="md"
              leftSection={<IconMail size={18} className="text-gray-400" />}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              required
              size="md"
              leftSection={<IconKey size={18} className="text-gray-400" />}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button
              fullWidth
              size="md"
              mt="sm"
              onClick={handleSignup}
              variant="gradient"
              gradient={{ from: "blue", to: "purple", deg: 45 }}
              className="shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-semibold"
            >
              Create Account
            </Button>

            <div className="text-center mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
              <Text size="sm" className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Anchor
                  component={Link}
                  to="/login"
                  className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200"
                >
                  Sign in here
                </Anchor>
              </Text>
            </div>
          </Stack>
        </Paper>

        <div className="text-center mt-6 sm:mt-8">
          <Text size="xs" className="text-gray-500 dark:text-gray-400">
            Protected by AES-256 encryption and modern security practices
          </Text>
        </div>
        <Footer />
      </Container>
    </div>
  );
};

export default Signup;
