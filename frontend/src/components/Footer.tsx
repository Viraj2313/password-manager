import { Box, Text } from "@mantine/core";
const Footer = () => {
  return (
    <Box className="text-center mt-20 pt-12 border-t border-gray-200 dark:border-gray-700 mb-12">
      <Text className="text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Viraj Mahajan. Built with security and
        privacy in mind.{" "}
        <a
          href="https://github.com/Viraj2313"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Github (Viraj)
        </a>
      </Text>
    </Box>
  );
};
export default Footer;
