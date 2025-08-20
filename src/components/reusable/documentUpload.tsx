import { colors } from "@/constants/colors";
import { useUploadAttachment } from "@/hooks/api/use.Ir.Attachment";
import { IconX } from "@tabler/icons-react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Button from "./button";
const { primary } = colors;

// Shared document upload field for types that need it
export default function DocumentUploadField({
  onChange,
}: {
  onChange: (ids: number[]) => void;
}) {
  const [attachments, setAttachments] = useState<
    { id: number; name: string }[]
  >([]);
  const { doUploadDocument, isPending } = useUploadAttachment();

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
        ],
        multiple: false,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const payload = {
          name: file.name,
          type: "binary",
          datas: base64,
          mimetype: file.mimeType || "application/octet-stream",
          public: true,
          res_model: "hr.leave",
        };

        doUploadDocument(payload, {
          onSuccess: (data) => {
            if (data.data?.data[0].id) {
              const newAttachments = [
                ...attachments,
                {
                  id: data.data?.data[0].id,
                  name: data.data?.data[0].name,
                },
              ];
              setAttachments(newAttachments);
              onChange(newAttachments.map((doc) => doc.id));
            }
          },
        });
      }
    } catch (error) {
      console.error("Document picker error:", error);
    }
  };

  const removeDocument = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    onChange(newAttachments.map((doc) => doc.id));
  };

  return (
    <View className="space-y-2">
      <Pressable
        onPress={handleFilePick}
        style={{
          backgroundColor: isPending ? "#bfdbfe" : primary,
        }}
        className="p-4 rounded-xl bg-blue-200"
      >
        {isPending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="font-bold text-center text-white">
            Upload Attachment
          </Text>
        )}
      </Pressable>
      {attachments.length > 0 ? (
        <View className="space-y-2">
          {attachments.map((doc, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between p-2  rounded"
            >
              <Text className="flex-1" numberOfLines={1}>
                {doc.name}
              </Text>
              <Button onPress={() => removeDocument(index)}>
                <IconX size={16} className="text-destructive" />
              </Button>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-sm text-muted-foreground p-2">
          No documents uploaded
        </Text>
      )}
    </View>
  );
}
