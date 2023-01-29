import { useEffect, useState, useRef, HTMLAttributes, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Flex, Box, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { Button } from '@/flat/Button';
import StickyBottom from '@/flat/StickyBottom';
import { setData } from '../surveySlice';
import { RootState } from '@/store';
import api from '@/core/api';
import { handleError } from '@/utils/errors';
import { PageProps } from '../interface';
// import placeholder from '../../../../media/fileinput-placeholder.svg';

interface ImageElementProps {
  element: any;
  onNextClick: () => void;
  onPreviousClick: () => void;
}

interface ImagePreviewProps extends HTMLAttributes<HTMLElement> {
  file: File;
  element: any;
}

const useFileObjectUrl = (file: File) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    setUrl(URL.createObjectURL(file));
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return url;
};

const ImagePreview = ({ file, element, ...props }: ImagePreviewProps) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.survey);
  const url = useFileObjectUrl(file);

  function onDelete() {
    dispatch(
      setData({
        ...data,
        [element.name]: data[element.name].filter(
          (image: any) => !(image.name === file.name && image.size === file.size)
        )
      })
    );
  }

  return url ? (
    <Flex py={4} px={3} alignItems="center" bg="bg.200" w="100%" borderRadius="lg" flexFlow="row">
      <Image {...props} w="40px" src={url} alt={file.name} />
      <Text fontSize="xl" mx={3}>
        Uploaded
      </Text>
      <Box flex="1"></Box>
      <Button w="100px" onClick={onDelete}>
        Delete
      </Button>
    </Flex>
  ) : null;
};

function ImageElement({
  element,
  isLastPage,
  onNextClick,
  onPreviousClick
}: PageProps) {
  const dispatch = useDispatch();
  const { submitting } = useSelector((state: RootState) => state.survey);
  const [imagePlaceholder, setImagePlaceholder] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useSelector((state: RootState) => state.survey);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.isArray(data[element.name]) ? [...data[element.name]] : []
    const elFiles = e.currentTarget.files
    if (elFiles) {
      for (let i=0; i < elFiles.length; i++) {
        files.push(elFiles[i])
      }
    }
    e.target.value = ""
    dispatch(setData({...data, [element.name]: files}))
  }

  function uploadImages() {
    inputRef.current?.click();
  }

  function getQuestionImage() {
    const url = element.imageUrl ?? `question_image_by_id/${element.image}/`;
    let req
    if (element.imageUrl) {
      req = axios.get(url, {responseType: 'blob'});
    } else {
      req = api.get(url);
    }
    req
      .then(res => {
        if (res.data instanceof Blob) {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
              setImagePlaceholder(reader.result);
            }
          })
          reader.readAsDataURL(res.data);
        } else {
          setImagePlaceholder('data:image/jpeg;base64,' + res.data.base64);
        }
      })
      .catch(err => {
        handleError(err);
      })
  }

  useEffect(() => {
    getQuestionImage();
  }, []);

  return (
    <Flex>
      {data[element.name] && data[element.name].length ? (
        <VStack w="100%">
          {data[element.name].map((image: File, i: number) => {
            return <ImagePreview key={i} element={element} file={image} />;
          })}
        </VStack>
      ) : null}
      <Box display={data[element.name] && data[element.name].length ? 'none' : 'block'} w="100%">
        <Image
          src={imagePlaceholder}
          w="100%"
          borderRadius="md"
          onClick={uploadImages}
        />
      </Box>
      <StickyBottom backgroundColor="bg.100">
        <VStack w="100%">
          <Button colorScheme="white" variant="outline" onClick={uploadImages} style={{position: 'relative'}}>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              onInput={onChange}
              style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 0, pointerEvents: 'none'}}
            />
          </Button>
          <Button colorScheme="white" isLoading={submitting} onClick={onNextClick}>
            {isLastPage ? 'Submit' : 'Next'}
          </Button>
        </VStack>
      </StickyBottom>
    </Flex>
  );
}

export default ImageElement;
