'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shortenUrl } from '../API/shortenUrl';
import QRCode from 'qrcode.react';
import { FaLink } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import Image from 'next/image';
import SidePicture from '../assets/SidePic.png';
import SideBar from '../Dash-Folder/Sidebar';
import { collection, addDoc, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { auth, firestore } from '../Firebase/firebase'; // Adjust the path based on your project structure

// Define the type for URLs fetched from Firestore
interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  clickCount: number;
  createdAt: Date;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem;
  height: 100vh;
  background-color:#e1e8e6 ;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;
const FormContainer = styled.div`
  max-width: 600px;
  flex: 1;
  background: linear-gradient(to bottom, #09464b, #d3b99f);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-left: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 2rem;
  width: 600px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 8px;
  text-shadow: #f9f9f9;
  letter-spacing: 1px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: #09191b; /* Space between icon and text */
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;    
  margin-top: 6px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 8px;
  width: 50%;
`;

const ShortenButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color:#09464b;
  color:#c9ae91;
  font-size: 1rem;
  width: 60%;
  margin-right: 10px;
  height: 4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color:#07565d;
  }
`;

const QRButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color:#c9ae91;
  color: white;
  font-size: 1rem;
  width: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:#c5ae98;
  }
`;

const CopyButton = styled.button`
  padding: 0.50rem;
  border: none;
  border-radius: 8px;
  background-color:#c9ae91;
  color: white;
  font-size: 1rem;
  width: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:#c5ae98;
  }
`;
const DownloadButton = styled.button`
  padding: 0.50rem;
  border: none;
  border-radius: 4px;
  background-color: #177076;
  color: white;
  font-size: 1rem;
  width: 20%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:#057880;
  }
`;

const MyUrlsButton = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color:#c9ae91;
  color:#09464b;
  font-size: 1rem;
  width: 40%;
  margin: 0 10px;
  height: 4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color:#c5ae98;
  }

  @media (max-width: 768px) {
    width: 50%;
    margin-left: 25%;
  }
`;

const ShortenAnotherButton = styled.button`
 padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #09464b;
  color: white;
  font-weight: 400;
  margin-left: 25%;
  margin-top: 15px;
  font-size: 1rem;
  width: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #03545c;
  }
`;

const ResultBox = styled.div`
  padding: 1rem;
  border:none;
  border-radius: 4px;
  background: transparent;
  height: 60vh;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Section = styled.div`
 margin-bottom: 1.50rem;
`;
const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: linear-gradient(180deg, #fff,#d3b99f); 
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 1rem;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ClearHistoryButton = styled.button`
  display: block;
  padding: 0.5rem 1rem;
  border: none;
  margin-left: 10rem;
  color: red;
  font-size: 1rem;
  width: 50%;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    transform: scale(0.9);
  }
`;

const UrlEntry = styled.div`
  margin-bottom: 1.5rem;
`;

const UrlInfo = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const CopiedButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
  padding: 0.5rem;
  background-color: #343e5a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color:#30374a;
    transform: scale(0.9);
  }
`;

const QRedButton = styled(CopyButton)`
  background-color: #343e5a;
  margin-right: 0;
  &:hover {
    background-color:  #30374a;
    transform: scale(0.9);
  }
`;

const DownloadsButton = styled(CopyButton)`
  background-color: #c89c70;
  margin-top: 0.5rem;
  &:hover {
    background-color:#dab795;
  }
`;

const Divider = styled.hr`
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #333;
`;

const QRCodeWrapper = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;

`;

const downloadQRCode = (url: string) => {
  const canvas = document.querySelector('canvas');
  if (canvas) {
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${url}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

const UrlShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [domain, setDomain] = useState('tinyurl.com');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setQrCodeVisible(false);
  
    try {
      const shortenedUrl = await shortenUrl(longUrl, customAlias);
      setShortUrl(shortenedUrl);
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(collection(firestore, 'users', user.uid, 'shortenedUrls'), {
          originalUrl: longUrl,
          shortenedUrl,
          clickCount: 0,
          createdAt: new Date(),
        });
        // Fetch the URLs again to update the state
        const newUrl = {
          id: docRef.id,
          originalUrl: longUrl,
          shortenedUrl,
          clickCount: 0,
          createdAt: new Date(),
        };
        setUrls((prevUrls) => [...prevUrls, newUrl]);
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to shorten URL');
    }
  };
  
  const handleUrlClick = async (urlId: string) => {
    const user = auth.currentUser;
    if (user) {
      const urlRef = doc(firestore, 'users', user.uid, 'shortenedUrls', urlId);
      await updateDoc(urlRef, {
        clickCount: increment(1),
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('URL copied to clipboard!');
  };

  const handleQRCode = () => {
    setQrCodeVisible(!qrCodeVisible);
  };

  const handleShortenAnother = () => {
    setLongUrl('');
    setCustomAlias('');
    setDomain('tinyurl.com');
    setShortUrl('');
    setError('');
    setQrCodeVisible(false);
  };

  const handleMyUrls = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleClearHistory = () => {
    setUrls([]);
  };
  useEffect(() => {const fetchUrls = async () => {
    const user = auth.currentUser;
    if (user) {
      const querySnapshot = await getDocs(collection(firestore, 'users', user.uid, 'shortenedUrls'));
      const urlsData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as ShortenedUrl;
        return {
          ...data,
          id: doc.id,
        };
      });
      console.log('Fetched URLs:', urlsData); 
      setUrls(urlsData);
    } else {
      console.log('No user is authenticated'); 
    }
  };
     
    fetchUrls();
  }, []);
    return (
    <Container>
      <SideBar />
      <FormContainer>
        {!shortUrl ? (
          <Form onSubmit={handleSubmit}>
          <div>
           <Label htmlFor="longUrl"> <FaLink />Shorten a long URL</Label>
            <Input
              type="url"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="domain"> <FaWandMagicSparkles />Customize your link</Label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Select id="domain" value={domain} onChange={(e) => setDomain(e.target.value)}>
                <option value="tinyurl.com">tinyurl.com</option>
              </Select>
              <Input
                type="text"
                placeholder="Enter alias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>  
          <MyUrlsButton type="button" onClick={handleMyUrls}>My URLs</MyUrlsButton>
          <ShortenButton type="submit">Shorten URL</ShortenButton>
          </div>
        </Form>
        ) : (
<ResultBox>
            <Section>
              <Label><FaLink /><FaLink />Your Long URL</Label>
              <Input type="text" value={longUrl} readOnly />
            </Section>
            <Section>
              <Label> <FaLink /> Tinyurl URL</Label>
              <Input type="text" value={shortUrl} readOnly />
            </Section>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '10px' }}>
              <CopyButton onClick={handleCopy}>Copy URL</CopyButton>
              <QRButton onClick={handleQRCode}>Generate QR Code</QRButton>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ShortenAnotherButton onClick={handleShortenAnother}>Shorten another URL</ShortenAnotherButton>
              </div>
            {qrCodeVisible && (
              <div>
                <QRCode value={shortUrl} />
                <DownloadButton onClick={() => downloadQRCode(shortUrl)}>Download QR Code</DownloadButton>
              </div>
            )}
          </ResultBox>
        )}
      </FormContainer>
      <LogoContainer>
        <Image src={SidePicture} alt="Side Image" layout="responsive" objectFit="contain" />
      </LogoContainer>
      <Sidebar isOpen={sidebarOpen}>
  <CloseButton onClick={handleCloseSidebar}>x</CloseButton>
  <Title>Your Shortened Urls</Title>
  {urls.length > 0 ? (
    urls.map((url) => (
      <UrlEntry key={url.id}>
        <UrlInfo>
          <p>**Original URL: {url.originalUrl}</p>
          <p>**Shortened URL: {url.shortenedUrl}</p>
        </UrlInfo>
        <p>**Clicks: {url.clickCount}</p>
        <ButtonGroup>
          <CopiedButton onClick={() => handleCopy(url.shortenedUrl)}>Copy</CopiedButton>
          <QRedButton onClick={() => setQrCodeVisible(!qrCodeVisible)}>Generate QR</QRedButton>
        </ButtonGroup>
        {qrCodeVisible && (
          <QRCodeWrapper>
            <QRCode value={url.shortenedUrl} size={128} />
            <DownloadsButton onClick={() => downloadQRCode(url.shortenedUrl)}>Download QR</DownloadsButton>
          </QRCodeWrapper>
        )}
        <Divider />
  <ClearHistoryButton onClick={handleClearHistory}>Clear History</ClearHistoryButton>

      </UrlEntry>
    ))
  ) : (
    <p>No shortened URLs found.</p>
  )}
</Sidebar>

    </Container>
  );
};

export default UrlShortener;
