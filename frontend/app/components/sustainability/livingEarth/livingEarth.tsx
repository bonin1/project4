'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import './livingEarth.scss';

interface ActiveData {
    region: string;
    impact: string;
    percentage: number;
}

const LivingEarth: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeData, setActiveData] = useState<ActiveData>({
        region: 'Global',
        impact: 'Reducing carbon footprint through sustainable practices',
        percentage: 65
    });
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let earth: THREE.Mesh;
        let renderer: THREE.WebGLRenderer;
        
        try {
            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
            
            // Renderer setup with error handling
            try {
                renderer = new THREE.WebGLRenderer({ 
                    alpha: true, 
                    antialias: true,
                    canvas: document.createElement('canvas')
                });
                renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
                containerRef.current.appendChild(renderer.domElement);
            } catch (error) {
                throw new Error('Failed to initialize WebGL renderer');
            }

            // Create Earth with proper texture loading
            const geometry = new THREE.SphereGeometry(5, 64, 64);
            const textureLoader = new THREE.TextureLoader();
            
            const loadTexture = (url: string): Promise<THREE.Texture> => {
                return new Promise((resolve, reject) => {
                    textureLoader.load(url, resolve, undefined, reject);
                });
            };

            // Load textures concurrently
            Promise.all([
                loadTexture('/eco/earth-texture.jpeg'),      // Use a basic Earth texture
                loadTexture('/eco/earth-texture.jpeg'),   // Normal map
                loadTexture('/eco/earth-texture.jpeg')  // Specular map
            ]).then(([earthMap, normalMap, specularMap]) => {
                const material = new THREE.MeshPhongMaterial({
                    map: earthMap,
                    normalMap: normalMap,
                    specularMap: specularMap,
                    normalScale: new THREE.Vector2(0.5, 0.5),
                    shininess: 5
                });

                earth = new THREE.Mesh(geometry, material);
                scene.add(earth);

                // Lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                const pointLight = new THREE.PointLight(0xffffff, 1);
                pointLight.position.set(15, 15, 15);
                scene.add(ambientLight, pointLight);

                // Camera position
                camera.position.z = 15;

                // Animation
                const animate = () => {
                    requestAnimationFrame(animate);
                    if (earth) {
                        earth.rotation.y += 0.001;
                    }
                    renderer.render(scene, camera);
                };

                setIsLoading(false);
                animate();
            }).catch(error => {
                setLoadError('Failed to load Earth textures');
                console.error('Texture loading error:', error);
            });

            // Resize handler
            const handleResize = () => {
                if (!containerRef.current) return;
                const width = containerRef.current.clientWidth;
                const height = containerRef.current.clientHeight;
                
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            };

            window.addEventListener('resize', handleResize);
            
            // Cleanup
            return () => {
                window.removeEventListener('resize', handleResize);
                if (containerRef.current && renderer.domElement) {
                    containerRef.current.removeChild(renderer.domElement);
                }
                renderer.dispose();
            };

        } catch (error) {
            setLoadError('Failed to initialize 3D scene');
            console.error('Scene setup error:', error);
            setIsLoading(false);
        }
    }, []);

    return (
        <section className="living-earth">
            <div className="globe-container" ref={containerRef}>
                {isLoading && (
                    <div className="loading">Loading Earth visualization...</div>
                )}
                {loadError && (
                    <div className="error">{loadError}</div>
                )}
            </div>
            
            <motion.div 
                className="data-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2>Global Impact</h2>
                <div className="impact-visualization">
                    <motion.div 
                        className="progress-ring"
                        style={{
                            background: `conic-gradient(#4CAF50 ${activeData.percentage * 3.6}deg, transparent 0deg)`
                        }}
                    >
                        <span>{activeData.percentage}%</span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {activeData.impact}
                    </motion.p>
                </div>

                <div className="eco-indicators">
                    <motion.div 
                        className="indicator"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="label">Carbon Neutral</span>
                        <div className="line" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default LivingEarth;
