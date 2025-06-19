import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Text,
  Title,
  Card,
  Button,
  Container,
  Group,
  Box,
  ActionIcon,
  Avatar,
  Divider,
  Stack,
  CopyButton,
  Tooltip,
  LoadingOverlay,
  Modal,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import {
  IconEye,
  IconEyeOff,
  IconCopy,
  IconCheck,
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconGlobe,
  IconUser,
  IconLock,
} from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";
import type { PasswordEntry } from "../types/password";

function PasswordDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<PasswordEntry | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const res = await axios.get(`/api/passwords/${id}`, {
          withCredentials: true,
        });
        setEntry(res.data);
      } catch (err) {
        console.error("Error fetching password details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPassword();
  }, [id]);

  const getInitials = (site: string) => {
    return site.charAt(0).toUpperCase();
  };

  const handleEdit = () => {
    if (entry) {
      setEditForm({
        site: entry.site,
        username: entry.username,
        password: "",
      });
      setEditModalOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!entry) return;

    setEditLoading(true);
    try {
      await axios.put(
        `/api/passwords/edit-password/${entry.id}`,
        {
          site: editForm.site,
          username: editForm.username,
          password: editForm.password || undefined,
        },
        {
          withCredentials: true,
        }
      );

      setEntry({
        ...entry,
        site: editForm.site,
        username: editForm.username,
        passwordEnc: editForm.password ? editForm.password : entry.passwordEnc,
      });

      setEditModalOpen(false);
      toast.success("Item updated successfully!");
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Failed to update item. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url.includes("://") ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  };

  if (loading) {
    return (
      <Container size="sm" className="mt-10">
        <Card
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          radius="lg"
          p="xl"
        >
          <LoadingOverlay visible={true} />
          <Box className="h-64" />
        </Card>
      </Container>
    );
  }

  if (!entry) {
    return (
      <Container size="sm" className="mt-10">
        <Card
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          radius="lg"
          p="xl"
        >
          <Box className="text-center py-12">
            <Text className="text-gray-600 dark:text-gray-400">
              Item not found
            </Text>
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => navigate("/")}
              className="mt-4"
            >
              Back to Vault
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="sm" className="py-8">
      <Box className="mb-6">
        <Group justify="space-between" className="mb-4">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate("/")}
            className="text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Back to Vault
          </Button>
          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="md"
              onClick={handleEdit}
              className="text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="md"
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>

      <Card
        className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
        radius="lg"
        p="xl"
      >
        <Box className="mb-8">
          <Group gap="md" className="mb-6">
            <Avatar
              size="lg"
              radius="md"
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
            >
              {getInitials(entry.site)}
            </Avatar>
            <Box>
              <Title
                order={1}
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-1"
              >
                {entry.site}
              </Title>
              <Text className="text-gray-600 dark:text-gray-400">
                {getDomainFromUrl(entry.site)}
              </Text>
            </Box>
          </Group>
        </Box>

        <Stack gap="lg">
          <Box>
            <Group gap="xs" className="mb-3">
              <IconGlobe size={16} className="text-gray-500" />
              <Text
                size="sm"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                Website
              </Text>
            </Group>
            <Group
              justify="space-between"
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Text className="text-gray-900 dark:text-white font-mono">
                {entry.site}
              </Text>
              <CopyButton value={entry.site}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied" : "Copy"}>
                    <ActionIcon
                      variant="subtle"
                      onClick={copy}
                      className="text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Box>

          <Box>
            <Group gap="xs" className="mb-3">
              <IconUser size={16} className="text-gray-500" />
              <Text
                size="sm"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </Text>
            </Group>
            <Group
              justify="space-between"
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Text className="text-gray-900 dark:text-white font-mono">
                {entry.username}
              </Text>
              <CopyButton value={entry.username}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied" : "Copy"}>
                    <ActionIcon
                      variant="subtle"
                      onClick={copy}
                      className="text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Box>

          <Box>
            <Group gap="xs" className="mb-3">
              <IconLock size={16} className="text-gray-500" />
              <Text
                size="sm"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </Text>
            </Group>
            <Group
              justify="space-between"
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Text className="text-gray-900 dark:text-white font-mono">
                {visible ? entry.passwordEnc : "••••••••••••"}
              </Text>
              <Group gap="xs">
                <Tooltip label={visible ? "Hide" : "Show"}>
                  <ActionIcon
                    variant="subtle"
                    onClick={() => setVisible(!visible)}
                    className="text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {visible ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                  </ActionIcon>
                </Tooltip>
                <CopyButton value={entry.passwordEnc}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? "Copied" : "Copy"}>
                      <ActionIcon
                        variant="subtle"
                        onClick={copy}
                        className="text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {copied ? (
                          <IconCheck size={16} />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
          </Box>
        </Stack>

        <Divider className="my-8" />

        <Box className="text-center">
          <Group justify="center" gap="md">
            <Button
              variant="outline"
              leftSection={<IconEdit size={16} />}
              onClick={handleEdit}
              radius="md"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Edit Item
            </Button>
            <Button
              variant="outline"
              color="red"
              leftSection={<IconTrash size={16} />}
              radius="md"
              className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Delete Item
            </Button>
          </Group>
        </Box>
      </Card>

      <Box className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <Group gap="xs" className="mb-2">
          <IconLock size={16} className="text-green-600 dark:text-green-400" />
          <Text size="sm" className="font-medium text-gray-900 dark:text-white">
            Secure Storage
          </Text>
        </Group>
        <Text size="xs" className="text-gray-600 dark:text-gray-400">
          This item is encrypted with AES-256 encryption and stored securely in
          your vault.
        </Text>
      </Box>

      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={
          <Group gap="sm">
            <IconEdit size={20} />
            <Text className="font-semibold">Edit Item</Text>
          </Group>
        }
        size="md"
        radius="lg"
        centered
      >
        <Stack gap="lg">
          <TextInput
            label="Website"
            placeholder="example.com"
            leftSection={<IconGlobe size={18} className="text-gray-500" />}
            radius="md"
            size="md"
            withAsterisk
            value={editForm.site}
            onChange={(e) => setEditForm({ ...editForm, site: e.target.value })}
            classNames={{
              label:
                "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              input:
                "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700",
            }}
          />

          <TextInput
            label="Username"
            placeholder="your@email.com"
            leftSection={<IconUser size={18} className="text-gray-500" />}
            radius="md"
            size="md"
            withAsterisk
            value={editForm.username}
            onChange={(e) =>
              setEditForm({ ...editForm, username: e.target.value })
            }
            classNames={{
              label:
                "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              input:
                "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700",
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Leave empty to keep current password"
            leftSection={<IconLock size={18} className="text-gray-500" />}
            radius="md"
            size="md"
            value={editForm.password}
            onChange={(e) =>
              setEditForm({ ...editForm, password: e.target.value })
            }
            classNames={{
              label:
                "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              input:
                "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700",
            }}
          />

          <Text size="xs" className="text-gray-600 dark:text-gray-400">
            Leave password field empty to keep your current password unchanged.
          </Text>

          <Group justify="space-between" className="pt-4">
            <Button
              variant="subtle"
              color="gray"
              radius="md"
              size="md"
              onClick={() => setEditModalOpen(false)}
              disabled={editLoading}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              radius="md"
              size="md"
              onClick={handleSaveEdit}
              loading={editLoading}
              disabled={!editForm.site || !editForm.username}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 transition-colors duration-200"
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

export default PasswordDetails;
