import React, { useState, useCallback, useRef, useEffect } from 'react';

// --- Helper Components ---

// Icon component for better visual feedback
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
);

// --- Main App Components ---

/**
 * ControlsPanel: The left sidebar for all user inputs.
 */
const ControlsPanel = ({
    theme, setTheme, subject, setSubject, elements, setElements,
    easterEggs, setEasterEggs, onGenerate, onClearAll, isLoading
}) => {
    
    const placeholders = {
        City: "e.g., Golden, Colorado", Band: "e.g., The Grateful Dead",
        Holiday: "e.g., Halloween", Custom: "e.g., Cosmic Ocean Monsters"
    };

    const elementsPlaceholders = {
        City: "e.g., The 'Welcome' Arch, Clear Creek", Band: "e.g., Dancing bears, 13-point bolt",
        Holiday: "e.g., Spooky pumpkins, haunted house", Custom: "e.g., Alien surfers, giant squid"
    };
    
    const easterEggPlaceholders = {
        City: "e.g., A mountain goat on a ridge", Band: "e.g., A hidden terrapin turtle",
        Holiday: "e.g., A black cat in a window", Custom: "e.g., A tiny UFO in the clouds"
    };

    return (
        <aside className="w-full md:w-[400px] bg-gray-800 p-6 border-r border-gray-700 overflow-y-auto flex flex-col space-y-6 flex-shrink-0">
            <h2 className="text-2xl font-bold text-white border-b border-gray-600 pb-3">Design Your Deck</h2>

            {/* Theme & Subject */}
            <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-300">1. Theme & Subject</label>
                <div className="grid grid-cols-2 gap-2">
                    {['City', 'Band', 'Holiday', 'Custom'].map(t => (
                        <label key={t} className={`p-3 text-center rounded-lg cursor-pointer transition-all duration-200 ${theme === t ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
                            <input type="radio" name="theme" value={t} checked={theme === t} onChange={(e) => setTheme(e.target.value)} className="hidden" />
                            {t}
                        </label>
                    ))}
                </div>
                <input
                    type="text" id="subject-input" value={subject} onChange={(e) => setSubject(e.target.value)}
                    placeholder={placeholders[theme]}
                    className="w-full mt-2 p-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Key Elements */}
            <div className="space-y-3">
                <label htmlFor="elements-input" className="block text-lg font-semibold text-gray-300">2. Key Elements</label>
                <textarea
                    id="elements-input" value={elements} onChange={(e) => setElements(e.target.value)}
                    placeholder={elementsPlaceholders[theme]}
                    className="w-full p-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
            </div>

            {/* Easter Eggs */}
            <div className="space-y-3">
                <label htmlFor="easter-eggs-input" className="block text-lg font-semibold text-gray-300">3. Easter Eggs <span className="text-sm font-normal text-gray-400">(Subtle Details)</span></label>
                <textarea
                    id="easter-eggs-input" value={easterEggs} onChange={(e) => setEasterEggs(e.target.value)}
                    placeholder={easterEggPlaceholders[theme]}
                    className="w-full p-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
            </div>
            
            <div className="pt-4 mt-auto space-y-3">
                <button
                    onClick={onGenerate} disabled={isLoading}
                    className="w-full flex items-center justify-center p-4 border-none rounded-lg bg-blue-600 text-white font-bold text-lg cursor-pointer transition-all duration-200 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                    {isLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <Icon path="M9.813 15.904L9 15l.813-.904L12 12l2.187 2.096L15 15l-.813.904L12 18l-2.187-2.096zM12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21z" className="w-6 h-6 mr-2" />}
                    {isLoading ? 'Generating...' : 'Generate Deck'}
                </button>
                
                <button
                    onClick={onClearAll}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center p-2 border border-gray-600 rounded-lg bg-transparent text-gray-300 font-medium cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                    <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="w-4 h-4 mr-2" />
                    Clear All
                </button>
            </div>
        </aside>
    );
};

/**
 * DeckDisplay: A simplified component for displaying the final image.
 */
const DeckDisplay = ({ src, alt, onDownload }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
             <svg width="0" height="0">
                <defs>
                    <clipPath id="skateboard-mask" clipPathUnits="objectBoundingBox">
                        <path d="M0.5,0 C0.15,0,0,0.05,0,0.15 V0.85 C0,0.95,0.15,1,0.5,1 S1,0.95,1,0.85 V0.15 C1,0.05,0.85,0,0.5,0 Z"></path>
                    </clipPath>
                </defs>
            </svg>
            <div
                className="h-full w-full"
                style={{ clipPath: 'url(#skateboard-mask)' }}
            >
                <img
                    src={src} alt={alt}
                    className="w-full h-full object-cover shadow-2xl"
                />
            </div>
            <div className="flex items-center gap-4 mt-4 p-2 bg-gray-700 rounded-lg">
                <button onClick={() => onDownload('png')} className="bg-green-600 hover:bg-green-500 flex items-center gap-2 py-2 px-4 rounded-lg text-white font-bold">
                    <Icon path="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" className="w-5 h-5" />
                    Download PNG
                </button>
                 <button onClick={() => onDownload('svg')} className="bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2 py-2 px-4 rounded-lg text-white font-bold" title="Coming Soon!">
                    SVG (Pro)
                </button>
            </div>
        </div>
    );
};

/**
 * DisplayArea: The main area for showing the generated deck, loading states, and actions.
 */
const DisplayArea = ({ isLoading, imageUrl, subject, error, onGenerateVariation, onDownload }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-400">Researching & crafting your masterpiece...</p>
                </div>
            );
        }
        if (error) {
            return (
                 <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-lg max-w-md">
                    <Icon path="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-xl font-bold">Generation Failed</h3>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }
        if (imageUrl) {
            return <DeckDisplay src={imageUrl} alt={`Generated skateboard deck for ${subject}`} onDownload={onDownload} />;
        }
        return (
            <div className="text-center text-gray-500">
                <Icon path="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" className="w-24 h-24 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">DeckCraft AI</h3>
                <p>Your generated design will appear here.</p>
            </div>
        );
    };

    return (
        <main className="flex-grow p-4 md:p-8 bg-gray-900 flex flex-col items-center justify-center">
            <div className="flex-grow w-full flex items-center justify-center overflow-hidden py-4">
                <div className="h-[95%] w-auto" style={{aspectRatio: '8.25 / 32'}}>
                    {renderContent()}
                </div>
            </div>
            
            <div className="flex-shrink-0 mt-4">
                {imageUrl && !isLoading && (
                     <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
                        <button onClick={onGenerateVariation} className="bg-gray-600 hover:bg-gray-500 flex items-center gap-2 py-2 px-4 rounded-lg text-white font-bold">
                            <Icon path="M16.023 9.348h4.992v-.001a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-2.502m-13.023-4.5a.75.75 0 01.75-.75h4.992a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-2.502m13.023 4.5a.75.75 0 01-.75.75h-4.992a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v2.502m-13.023 4.5a.75.75 0 01-.75.75H3.008a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v2.502" className="w-5 h-5" />
                            New Variation
                        </button>
                        <button disabled className="bg-purple-600/50 flex items-center gap-2 py-2 px-4 rounded-lg text-white font-bold cursor-not-allowed">
                            <Icon path="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" className="w-5 h-5" />
                            Refine (Coming Soon)
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};


/**
 * App: The main component that brings everything together.
 */
export default function App() {
    const [theme, setTheme] = useState('City');
    const [subject, setSubject] = useState('');
    const [elements, setElements] = useState('');
    const [easterEggs, setEasterEggs] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    // Load Puter SDK on component mount
    useEffect(() => {
        if (!window.puter) {
            const script = document.createElement('script');
            script.src = 'https://js.puter.com/v2/';
            script.async = true;
            script.onload = () => {
                console.log('✅ Puter SDK loaded successfully');
            };
            script.onerror = () => {
                console.error('❌ Failed to load Puter SDK');
            };
            document.head.appendChild(script);
            
            return () => {
                if (document.head.contains(script)) {
                    document.head.removeChild(script);
                }
            };
        } else {
            console.log('✅ Puter SDK already loaded');
        }
    }, []);

    /**
     * ** ENHANCED: Intelligent prompt builder with comprehensive city research database **
     */
    const getCityPromptTemplate = (subject, userElements, userEasterEggs, isVariation = false) => {
        const lowerCaseSubject = subject.toLowerCase();
        
        // Enhanced research database with multiple cities and variation options
        const cityData = {
            'golden': {
                top: ["Early morning sunrise over the rugged Front Range of the Rocky Mountains", "Dramatic sunset behind the foothills with golden hour lighting", "Snow-capped peaks of the Continental Divide in winter"],
                upperMiddle: ["The iconic Golden 'Welcome Arch' spanning Washington Avenue", "The Colorado School of Mines campus with historic buildings", "Lookout Mountain rising majestically above the town"],
                lowerMiddle: ["Clear Creek winding through the city with kayakers", "The historic downtown district with Victorian architecture", "Coors Brewery complex with industrial smokestacks"],
                foreground: ["A skateboarder mid-trick in front of the historic Astor House Hotel", "Mountain bikers on the Clear Creek Trail", "Rock climbers scaling the nearby cliffs"],
                details: ["A small Coors Brewery smokestack and a faint mountain goat on a far ridge", "Buffalo Bill's grave marker on Lookout Mountain", "A golden eagle soaring over the foothills"],
                typography: "a weathered old-western font"
            },
            'denver': {
                top: ["The Denver skyline at sunrise with the Rocky Mountains backdrop", "Union Station's iconic clock tower against stormy skies", "Mile High Stadium gleaming under stadium lights"],
                upperMiddle: ["The 16th Street Mall bustling with pedestrians", "The Denver Art Museum's angular titanium architecture", "Cherry Creek flowing through the urban landscape"],
                lowerMiddle: ["LoDo's historic brick warehouses and breweries", "The State Capitol building with its gold dome", "Washington Park's tree-lined pathways"],
                foreground: ["Street performers at the 16th Street Mall", "Cyclists on the Cherry Creek bike path", "Skaters at a downtown plaza"],
                details: ["A subtle Broncos logo, the Blue Bear peeking around a building", "The Big Blue Bear statue, a small craft brewery sign", "A red-tailed hawk circling downtown towers"],
                typography: "a bold, industrial urban font"
            },
            'boulder': {
                top: ["The dramatic Flatirons rock formations at golden hour", "The University of Colorado campus with red-tile roofs", "Chautauqua Park meadows stretching toward the mountains"],
                upperMiddle: ["Pearl Street pedestrian mall with street performers", "The iconic Flatirons silhouetted against the sky", "Boulder Creek winding through the city"],
                lowerMiddle: ["Cyclists on the Boulder Creek Path", "The historic Pearl Street Mall with local shops", "Rock climbers on the nearby canyon walls"],
                foreground: ["A yoga session in Chautauqua Park", "Students biking across the CU campus", "Hikers preparing for a Flatirons trail"],
                details: ["A prairie dog colony, the CU Buffaloes logo subtly placed", "A small hot air balloon over the foothills", "A golden aspen leaf floating in Boulder Creek"],
                typography: "a natural, hand-drawn outdoor font"
            },
            'aspen': {
                top: ["Snow-covered peaks of the Maroon Bells reflecting in Maroon Lake", "Golden aspen groves in full autumn colors", "The dramatic Pyramid Peak towering over the valley"],
                upperMiddle: ["The historic Wheeler Opera House on Mill Street", "Luxury ski lodges nestled in the mountainside", "The Roaring Fork River cascading down the valley"],
                lowerMiddle: ["Skiers carving turns on Aspen Mountain", "The iconic Hotel Jerome with Victorian architecture", "Mountain bikers on summer trails through aspen groves"],
                foreground: ["Après-ski scene with people around a fire pit", "A horse-drawn sleigh in winter", "Hikers crossing a wooden bridge over the Roaring Fork"],
                details: ["A small ski gondola, an elk silhouette on a distant ridge", "A subtle Aspen leaf pattern, a distant eagle soaring", "A vintage ski poster aesthetic element"],
                typography: "an elegant, luxury resort-style font"
            },
            'vail': {
                top: ["The dramatic Gore Range peaks covered in fresh powder", "Vail's famous Back Bowls stretching endlessly", "The Eagle River Valley from high altitude"],
                upperMiddle: ["Vail Village's Bavarian-style architecture", "The iconic covered bridges over Vail Creek", "Gondolas carrying skiers up the mountain"],
                lowerMiddle: ["Skiers navigating the legendary Blue Sky Basin", "The Gerald Ford Amphitheater in summer", "Mountain wildflowers in alpine meadows"],
                foreground: ["A ski patrol rescue scene", "Summer hikers on the Gore Creek Trail", "A mountain wedding ceremony with epic views"],
                details: ["A subtle ski trail map pattern, a golden eagle overhead", "A small Colorado flag, vintage ski equipment", "A ptarmigan bird camouflaged in the rocks"],
                typography: "a clean, alpine-inspired sans-serif font"
            },
            'colorado springs': {
                top: ["Pikes Peak's majestic 14,115-foot summit", "The Garden of the Gods red rock formations", "The Air Force Academy chapel's distinctive spires"],
                upperMiddle: ["The dramatic Kissing Camels rock formation", "Seven Falls cascading down the canyon", "The Broadmoor hotel nestled against Cheyenne Mountain"],
                lowerMiddle: ["Rock climbers scaling the red sandstone spires", "The historic Manitou Springs incline railway", "Hikers on the Barr Trail to Pikes Peak"],
                foreground: ["A hot air balloon festival over the plains", "Cyclists on the Pikes Peak Highway", "A family exploring Cave of the Winds"],
                details: ["A subtle Air Force Thunderbirds formation, a bighorn sheep", "A small Pikes Peak cog railway, a prairie falcon", "The Olympic Training Center rings symbol"],
                typography: "a strong, mountaineering-inspired font"
            }
        };

        // Find matching city data
        let cityKey = Object.keys(cityData).find(k => lowerCaseSubject.includes(k));
        let promptData = cityData[cityKey] || {};
        
        // If no specific city found, create generic mountain town template
        if (!cityKey) {
            const words = lowerCaseSubject.split(' ');
            const hasColorado = words.some(w => ['colorado', 'co'].includes(w));
            const hasMountain = words.some(w => ['mountain', 'peak', 'summit', 'ridge'].includes(w));
            
            if (hasColorado || hasMountain) {
                promptData = {
                    top: ["Majestic Rocky Mountain peaks at sunrise", "Alpine lakes reflecting snow-capped summits", "Dramatic storm clouds over mountain ridges"],
                    upperMiddle: ["Historic mining town buildings", "A winding mountain highway", "Dense evergreen forests on steep slopes"],
                    lowerMiddle: ["A rushing mountain stream with boulders", "Wildflower meadows in summer bloom", "Hiking trails through aspen groves"],
                    foreground: ["Outdoor adventurers with backpacks", "A rustic cabin with smoke rising", "Wildlife like elk or deer"],
                    details: ["A distant eagle circling, abandoned mining equipment", "A small waterfall, vintage trail markers", "A coyote silhouette on a ridge"],
                    typography: "a rugged, wilderness-style font"
                };
            } else {
                return `A vibrant, imaginative skateboard deck design about ${subject}. ${userElements || 'Include local landmarks and cultural elements'}`;
            }
        }

        // Select elements (random for variations, first for initial)
        const selectElement = (arr) => {
            if (!arr || !Array.isArray(arr)) return "";
            return isVariation ? arr[Math.floor(Math.random() * arr.length)] : arr[0];
        };

        // Integrate user inputs or use researched data
        const topSection = selectElement(promptData.top);
        const upperMiddle = selectElement(promptData.upperMiddle);
        const lowerMiddle = userElements || selectElement(promptData.lowerMiddle);
        const foreground = selectElement(promptData.foreground);
        const details = userEasterEggs || selectElement(promptData.details);
        const typography = promptData.typography || "a bold, modern font";

        // Build the comprehensive prompt
        return `A single continuous, uncropped vertical skateboard deck illustration of ${subject}, flowing naturally from top to bottom with seamless visual transitions.

        Top Section: ${topSection}
        Upper-Middle Section: ${upperMiddle}
        Lower-Middle Section: ${lowerMiddle}
        Foreground/Base Section: ${foreground}
        Subtle Background/Details: ${details}
        
        The only text should be "${subject}" at the very bottom, styled in ${typography}.
        Style: Vibrant colors with high contrast, reminiscent of classic skateboard art with bold lines and dynamic composition.
        `;
    };

    /**
     * Mock image generation in Jimbo Phillips skateboard art style
     */
    const generateMockDeckImage = async (prompt, subjectName) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Skateboard deck dimensions (8.25" x 32" ratio)
            const width = 400;
            const height = 1200;
            canvas.width = width;
            canvas.height = height;
            
            // Jimbo Phillips style: Bold, high-contrast background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);
            
            // Jimbo Phillips signature vibrant color palette
            const jimboColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#8A2BE2'];
            
            // Create dramatic gradient typical of Jimbo's work
            const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, height/2);
            gradient.addColorStop(0, jimboColors[Math.floor(Math.random() * jimboColors.length)]);
            gradient.addColorStop(0.5, jimboColors[Math.floor(Math.random() * jimboColors.length)]);
            gradient.addColorStop(1, '#000000');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(20, 20, width - 40, height - 40);
            
            // Jimbo Phillips style: Bold outlines and cartoon-like elements
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#FFFFFF';
            
            // Create monster-like eyes (Jimbo's signature)
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(width/2 - 50, 200, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(width/2 + 50, 200, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Add pupils
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(width/2 - 50, 200, 15, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(width/2 + 50, 200, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Jimbo style: Wavy, organic shapes and bold teeth/mouth elements
            ctx.fillStyle = '#FF0000';
            ctx.beginPath();
            ctx.moveTo(width/2 - 80, 280);
            for (let x = width/2 - 80; x < width/2 + 80; x += 20) {
                const y = 280 + Math.sin((x - width/2) / 20) * 20;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(width/2 + 80, 320);
            ctx.lineTo(width/2 - 80, 320);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // Add jagged teeth (Jimbo signature)
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 8; i++) {
                const x = width/2 - 70 + i * 20;
                ctx.beginPath();
                ctx.moveTo(x, 280);
                ctx.lineTo(x + 10, 300);
                ctx.lineTo(x + 20, 280);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
            
            // Jimbo style: Flame-like elements
            ctx.fillStyle = jimboColors[Math.floor(Math.random() * jimboColors.length)];
            for (let i = 0; i < 5; i++) {
                const x = 50 + i * 60;
                ctx.beginPath();
                ctx.moveTo(x, height - 400);
                ctx.lineTo(x + 20, height - 500);
                ctx.lineTo(x + 40, height - 400);
                ctx.lineTo(x + 30, height - 350);
                ctx.lineTo(x + 10, height - 350);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            
            // Add wild, organic splatters and shapes
            for (let i = 0; i < 12; i++) {
                const x = Math.random() * (width - 80) + 40;
                const y = Math.random() * (height - 400) + 200;
                const size = Math.random() * 40 + 20;
                
                ctx.fillStyle = jimboColors[Math.floor(Math.random() * jimboColors.length)];
                ctx.beginPath();
                
                // Create irregular, organic shapes
                const points = 8;
                for (let j = 0; j < points; j++) {
                    const angle = (j / points) * Math.PI * 2;
                    const radius = size * (0.8 + Math.random() * 0.4);
                    const px = x + Math.cos(angle) * radius;
                    const py = y + Math.sin(angle) * radius;
                    
                    if (j === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
                
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
            // Jimbo Phillips signature bold text style
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 6;
            ctx.font = 'bold 32px Impact, Arial Black';
            ctx.textAlign = 'center';
            
            const text = subjectName.toUpperCase();
            const textY = height - 80;
            
            // Create 3D effect typical of Jimbo's lettering
            for (let i = 5; i >= 0; i--) {
                ctx.fillStyle = i === 0 ? '#FFFFFF' : jimboColors[i % jimboColors.length];
                ctx.fillText(text, width/2 + i, textY + i);
            }
            
            ctx.strokeText(text, width/2, textY);
            
            // Add "JIMBO STYLE DEMO" watermark
            ctx.fillStyle = '#888888';
            ctx.font = 'bold 14px Arial';
            ctx.fillText('JIMBO PHILLIPS STYLE DEMO', width/2, height - 15);
            
            // Bold border typical of skateboard graphics
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 6;
            ctx.strokeRect(3, 3, width - 6, height - 6);
            
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl);
        });
    };

    /**
     * Real AI image generation using Puter AI txt2img
     */
    const generateImageWithPuter = async (prompt, subjectName) => {
        try {
            // Check if Puter is available
            if (typeof window.puter === 'undefined' || !window.puter.ai) {
                throw new Error('Puter AI SDK not loaded. Please wait and try again.');
            }
            
            console.log('🎨 Generating with Puter AI...');
            console.log('📝 Prompt:', prompt);
            console.log('🎯 Subject:', subjectName);
            
            // Enhanced prompt specifically for skateboard deck art
            const enhancedPrompt = `
                ${prompt}
                
                Additional specifications:
                - Vertical skateboard deck format (8.25" x 32" proportions)
                - High resolution, print-ready quality
                - Bold, vibrant colors in Jimbo Phillips style
                - Professional skateboard graphic design aesthetic
                - Dynamic composition flowing top to bottom
            `;
            
            // Use Puter AI's text-to-image generation
            const imageResult = await window.puter.ai.txt2img(enhancedPrompt, {
                // Add any additional parameters Puter supports
                width: 512,
                height: 1536, // Skateboard aspect ratio
                quality: 'high'
            });
            
            console.log('✅ Puter AI generation successful!');
            
            // Handle different possible return formats
            if (typeof imageResult === 'string') {
                // If it returns a URL or base64 string directly
                return imageResult;
            } else if (imageResult && imageResult.url) {
                // If it returns an object with URL property
                return imageResult.url;
            } else if (imageResult && imageResult.data) {
                // If it returns an object with data property
                return imageResult.data;
            } else {
                throw new Error('Unexpected response format from Puter AI');
            }
            
        } catch (error) {
            console.error('❌ Puter AI generation error:', error);
            
            // If Puter AI fails, fall back to mock for demo purposes
            console.log('🔄 Falling back to mock generation...');
            const mockImage = await generateMockDeckImage(prompt, subjectName);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            throw new Error(`Puter AI generation failed: ${error.message}. Try refreshing the page to reload the Puter SDK.`);
        }
    };

    /**
     * Enhanced generation handler with improved intelligence
     */
    const handleGenerate = useCallback(async (isVariation = false) => {
        if (!subject) {
            alert('Please define a subject for your design!');
            return;
        }
        
        setIsLoading(true);
        setImageUrl(null);
        setError(null);

        let detailedPrompt;
        if (theme === 'City') {
            detailedPrompt = getCityPromptTemplate(subject, elements, easterEggs, isVariation);
        } else if (theme === 'Band') {
            // Enhanced band prompt with variation support
            const bandElements = isVariation ? 
                ["Concert stage with dramatic lighting", "Vintage vinyl records floating", "Musical instruments in dynamic poses", "Sound waves visualized as colorful streams"] :
                [elements || "Dancing bears, musical notes, psychedelic patterns"];
            const selectedElement = Array.isArray(bandElements) ? 
                bandElements[Math.floor(Math.random() * bandElements.length)] : bandElements[0];
            
            detailedPrompt = `A vibrant skateboard deck design celebrating ${subject} in the iconic style of Jimbo Phillips. ${selectedElement}. ${easterEggs ? `Hidden details: ${easterEggs}` : 'Subtle band imagery woven throughout'}. Bold neon colors, monster elements, sharp teeth, bulging eyes, and explosive energy typical of classic Jimbo Phillips skateboard art.`;
        } else if (theme === 'Holiday') {
            // Enhanced holiday prompt with variation support  
            const holidayScenes = isVariation ?
                ["Spooky haunted mansion with glowing windows", "Pumpkin patch under a full moon", "Trick-or-treaters on a foggy street", "Gothic cemetery with ancient tombstones"] :
                [elements || "Jack-o'-lanterns, autumn leaves, spooky atmosphere"];
            const selectedScene = Array.isArray(holidayScenes) ?
                holidayScenes[Math.floor(Math.random() * holidayScenes.length)] : holidayScenes[0];
                
            detailedPrompt = `A festive skateboard deck design for ${subject} in the legendary Jimbo Phillips style. ${selectedScene}. ${easterEggs ? `Subtle details: ${easterEggs}` : 'Hidden seasonal elements throughout'}. Vibrant neon colors, monster faces, dramatic outlines, and wild psychedelic energy.`;
        } else {
            // Custom theme with variation support
            const customScenes = isVariation ?
                ["Cosmic ocean with alien surfers riding nebula waves", "Giant squid playing chess with space octopi", "Underwater cities with bioluminescent architecture", "Interdimensional portals opening in deep space"] :
                [elements || "Imaginative, surreal artistic elements"];
            const selectedScene = Array.isArray(customScenes) ?
                customScenes[Math.floor(Math.random() * customScenes.length)] : customScenes[0];
                
            detailedPrompt = `An imaginative skateboard deck design in the iconic Jimbo Phillips style: ${subject}. ${selectedScene}. ${easterEggs ? `Easter eggs: ${easterEggs}` : 'Whimsical hidden details throughout'}. Bold neon colors, cartoonish monster elements, dramatic black outlines, and explosive psychedelic energy.`;
        }

        try {
            const generatedUrl = await generateImageWithPuter(detailedPrompt, subject);
            setImageUrl(generatedUrl);
        } catch (e) {
            console.error("Failed to generate image:", e);
            setError(e.message || "Generation failed. Please check your API configuration and try again.");
        } finally {
            setIsLoading(false);
        }
    }, [subject, theme, elements, easterEggs]);
    
    const handleGenerateVariation = useCallback(() => {
        handleGenerate(true); // Pass true for variation mode
    }, [handleGenerate]);
    
    // Clear all form fields
    const handleClearAll = useCallback(() => {
        setSubject('');
        setElements('');
        setEasterEggs('');
        setImageUrl(null);
        setError(null);
        setTheme('City');
    }, []);
    
    /**
     * Canvas-based download function
     */
    const handleDownload = useCallback((format) => {
        if (!imageUrl) return;

        if (format === 'svg') {
            alert('Vectorization is a planned professional feature that requires a backend service. For now, please use the high-resolution PNG download.');
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            const path = new Path2D("M0.5,0 C0.15,0,0,0.05,0,0.15 V0.85 C0,0.95,0.15,1,0.5,1 S1,0.95,1,0.85 V0.15 C1,0.05,0.85,0,0.5,0 Z");
            
            ctx.save();
            ctx.scale(canvas.width, canvas.height);
            ctx.clip(path);
            ctx.drawImage(img, 0, 0, 1, 1);
            ctx.restore();

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            const fileName = subject.replace(/ /g, '_') || 'deckcraft_design';
            link.download = `${fileName}_deck.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.onerror = () => {
            alert("Could not download image. There might be a cross-origin issue.");
        }

    }, [imageUrl, subject]);

    return (
        <div className="bg-gray-900 text-white font-sans flex flex-col md:flex-row h-screen">
            <ControlsPanel
                theme={theme}
                setTheme={setTheme}
                subject={subject}
                setSubject={setSubject}
                elements={elements}
                setElements={setElements}
                easterEggs={easterEggs}
                setEasterEggs={setEasterEggs}
                onGenerate={() => handleGenerate(false)}
                onClearAll={handleClearAll}
                isLoading={isLoading}
            />
            <DisplayArea
                isLoading={isLoading}
                imageUrl={imageUrl}
                subject={subject}
                error={error}
                onGenerateVariation={handleGenerateVariation}
                onDownload={handleDownload}
            />
        </div>
    );
}