import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Text,
  Divider,
  Box,
} from "@mantine/core";
import { IconLock, IconGlobe, IconUser, IconShield } from "@tabler/icons-react";
import type { PasswordEntry } from "../types/password";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AddPassword = () => {
  const [passwordEnt, setPasswordEnt] = useState<Omit<PasswordEntry, "id">>({
    site: "",
    username: "",
    passwordEnc: "",
  });
  const navigate = useNavigate();
  const { userId } = useUser();
  const handleSave = async () => {
    try {
      console.log(passwordEnt);
      const res = await axios.post("/api/passwords/add-password", passwordEnt, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Password added to vault! ");
      }
      navigate("/");
    } catch (err) {
      toast.error("Please try again!");
    }
  };
  if (!userId) {
    navigate("/login");
  }
  return (
    <Container size="sm" className="mt-8 mb-6">
      <Box className="max-w-md mx-auto">
        <Box className="mb-8 text-center">
          <Group justify="center" gap="xs" className="mb-4">
            <Box className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <IconShield
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            </Box>
          </Group>
          <Title
            order={1}
            size="h2"
            className="text-gray-900 dark:text-white font-semibold mb-2"
          >
            Add New Item
          </Title>
          <Text size="sm" className="text-gray-600 dark:text-gray-400">
            Securely store your login credentials
          </Text>
        </Box>

        <Paper
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
          radius="lg"
          p="xl"
        >
          <Stack gap="lg">
            <Box>
              <TextInput
                label="Website"
                placeholder="example.com"
                leftSection={<IconGlobe size={18} className="text-gray-500" />}
                radius="md"
                size="md"
                withAsterisk
                value={passwordEnt.site}
                onChange={(e) =>
                  setPasswordEnt({ ...passwordEnt, site: e.target.value })
                }
                classNames={{
                  label:
                    "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input:
                    "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700",
                }}
              />
            </Box>

            <Box>
              <TextInput
                label="Username"
                placeholder="your@email.com"
                leftSection={<IconUser size={18} className="text-gray-500" />}
                radius="md"
                size="md"
                withAsterisk
                value={passwordEnt.username}
                onChange={(e) =>
                  setPasswordEnt({ ...passwordEnt, username: e.target.value })
                }
                classNames={{
                  label:
                    "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input:
                    "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700",
                }}
              />
            </Box>

            {/* Password Input */}
            <Box>
              <PasswordInput
                label="Password"
                placeholder="Enter a strong password"
                leftSection={<IconLock size={18} className="text-gray-500" />}
                radius="md"
                size="md"
                withAsterisk
                value={passwordEnt.passwordEnc}
                onChange={(e) =>
                  setPasswordEnt({
                    ...passwordEnt,
                    passwordEnc: e.target.value,
                  })
                }
                classNames={{
                  label:
                    "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  input:
                    "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700",
                }}
              />
            </Box>

            <Divider className="my-2" />

            {/* Action Buttons */}
            <Group justify="space-between" className="pt-4">
              <Button
                variant="subtle"
                color="gray"
                radius="md"
                size="md"
                onClick={() => navigate("/")}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                radius="md"
                size="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 transition-colors duration-200"
                onClick={handleSave}
                disabled={
                  !passwordEnt.site ||
                  !passwordEnt.username ||
                  !passwordEnt.passwordEnc
                }
              >
                Save Item
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Security Notice */}
        <Box className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <Group gap="xs" className="mb-2">
            <IconShield
              size={16}
              className="text-green-600 dark:text-green-400"
            />
            <Text
              size="sm"
              className="font-medium text-gray-900 dark:text-white"
            >
              End-to-end encrypted
            </Text>
          </Group>
          <Text size="xs" className="text-gray-600 dark:text-gray-400">
            Your passwords are encrypted with AES-256 encryption before being
            stored.
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default AddPassword;
