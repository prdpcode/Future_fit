"use client";

import { useCanvas } from "./CanvasContext";
import { useState, useEffect } from "react";
import * as fabric from "fabric";
import { Palette } from "lucide-react";

export default function PropertiesPanel() {
    const { canvas, activeObject } = useCanvas();
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [isGradientMode, setIsGradientMode] = useState(false);
    const [gradientAngle, setGradientAngle] = useState(0);
    const [forceUpdate, setForceUpdate] = useState(0);

    // Listen for object modifications to update UI
    useEffect(() => {
        if (!canvas) return;

        const handleObjectModified = () => {
            setForceUpdate(prev => prev + 1);
        };

        canvas.on('object:modified', handleObjectModified);
        canvas.on('object:scaling', handleObjectModified);
        canvas.on('object:resizing', handleObjectModified);

        return () => {
            canvas.off('object:modified', handleObjectModified);
            canvas.off('object:scaling', handleObjectModified);
            canvas.off('object:resizing', handleObjectModified);
        };
    }, [canvas]);

    if (!activeObject) return null;

    // Color options
    const colorOptions = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
        '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
        '#808080', '#C0C0C0', '#FFD700', '#4B0082', '#008080', '#F0E68C'
    ];

    // Gradient presets
    const gradientPresets = [
        { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D'], angle: 45 },
        { name: 'Ocean', colors: ['#4ECDC4', '#44A08D'], angle: 90 },
        { name: 'Purple', colors: ['#667EEA', '#764BA2'], angle: 135 },
        { name: 'Fire', colors: ['#F12711', '#F5AF19'], angle: 180 },
        { name: 'Forest', colors: ['#134E5E', '#71B280'], angle: 270 },
        { name: 'Sky', colors: ['#56CCF2', '#2F80ED'], angle: 0 }
    ];

    const handleColorChange = (color: string) => {
        if (!canvas || !activeObject) return;
        setSelectedColor(color);
        setIsGradientMode(false);

        if (activeObject.type === 'text' || activeObject.type === 'i-text') {
            (activeObject as fabric.Text).set('fill', color);
        } else if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
            (activeObject as fabric.Object).set('fill', color);
        } else if (activeObject.type === 'path' || activeObject.type === 'group') {
            (activeObject as fabric.Object).set('fill', color);
        } else if (activeObject.type === 'image') {
            (activeObject as fabric.Image).set('tint', color);
        }

        canvas.requestRenderAll();
    };

    const handleGradientChange = (colors: string[], angle: number) => {
        if (!canvas || !activeObject) return;
        setIsGradientMode(true);

        const gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels',
            coords: {
                x1: 0,
                y1: 0,
                x2: Math.cos(angle * Math.PI / 180) * 100,
                y2: Math.sin(angle * Math.PI / 180) * 100
            },
            colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] }
            ]
        });

        if (activeObject.type === 'text' || activeObject.type === 'i-text') {
            (activeObject as fabric.Text).set('fill', gradient);
        } else if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
            (activeObject as fabric.Object).set('fill', gradient);
        } else if (activeObject.type === 'path' || activeObject.type === 'group') {
            (activeObject as fabric.Object).set('fill', gradient);
        }

        canvas.requestRenderAll();
    };

    const handleColorCodeInput = (colorCode: string) => {
        // Support hex, rgb, rgba, hsl, hsla
        const colorRegex = /^(#([0-9A-Fa-f]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)|hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\))$/;
        
        if (colorRegex.test(colorCode)) {
            handleColorChange(colorCode);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Basic Properties Section */}
            {(activeObject.type === 'text' || activeObject.type === 'i-text') && (
                <div>
                    <h3 className="font-semibold text-xs uppercase text-muted-foreground mb-3">Text Properties</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Font Size</label>
                            <input
                                type="number"
                                value={Math.round(((activeObject as fabric.Text).fontSize || 20) * ((activeObject as fabric.Text).scaleX || 1))}
                                onChange={(e) => {
                                    const size = parseInt(e.target.value);
                                    if (!isNaN(size) && size > 0) {
                                        const textObj = activeObject as fabric.Text;
                                        const currentScale = textObj.scaleX || 1;
                                        textObj.set('fontSize', size / currentScale);
                                        canvas?.requestRenderAll();
                                        // Force component re-render to update input value
                                        setForceUpdate(prev => prev + 1);
                                    }
                                }}
                                onBlur={(e) => {
                                    // Force update on blur to ensure value is correct
                                    const size = parseInt(e.target.value);
                                    if (!isNaN(size) && size > 0) {
                                        const textObj = activeObject as fabric.Text;
                                        const currentScale = textObj.scaleX || 1;
                                        textObj.set('fontSize', size / currentScale);
                                        canvas?.requestRenderAll();
                                        setForceUpdate(prev => prev + 1);
                                    }
                                }}
                                className="w-full px-2 py-1 text-xs border border-border rounded bg-background"
                                min="8"
                                max="200"
                                step="1"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Actual size: {Math.round((activeObject as fabric.Text).fontSize || 20)}px
                            </p>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Font Weight</label>
                            <select
                                value={(activeObject as fabric.Text).fontWeight || 'normal'}
                                onChange={(e) => {
                                    (activeObject as fabric.Text).set('fontWeight', e.target.value);
                                    canvas?.requestRenderAll();
                                }}
                                className="w-full px-2 py-1 text-xs border border-border rounded bg-background"
                            >
                                <option value="normal">Normal</option>
                                <option value="bold">Bold</option>
                                <option value="lighter">Light</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Color Picker Section */}
            <div className="border-t border-border pt-4">
                <h3 className="font-semibold text-xs uppercase text-muted-foreground mb-3 flex items-center gap-2">
                    <Palette size={12} />
                    Color & Gradient
                </h3>
                
                {/* Mode Toggle */}
                <div className="flex items-center gap-2 mb-3">
                    <button
                        onClick={() => setIsGradientMode(false)}
                        className={`px-3 py-1 text-xs rounded transition-colors border ${
                            !isGradientMode 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-background text-foreground border-border hover:bg-muted'
                        }`}
                    >
                        Solid Color
                    </button>
                    <button
                        onClick={() => setIsGradientMode(true)}
                        className={`px-3 py-1 text-xs rounded transition-colors border ${
                            isGradientMode 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-background text-foreground border-border hover:bg-muted'
                        }`}
                    >
                        Gradient
                    </button>
                </div>

                {!isGradientMode ? (
                    <>
                        {/* Solid Color Grid */}
                        <div className="grid grid-cols-4 gap-2 mb-3">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => handleColorChange(color)}
                                    className="w-8 h-8 rounded-md border-2 border-border hover:border-primary transition-colors relative group"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                >
                                    {color === '#FFFFFF' && (
                                        <div className="absolute inset-0 rounded-md border border-gray-300" />
                                    )}
                                    <div className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </button>
                            ))}
                        </div>

                        {/* Enhanced Color Code Input */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={selectedColor}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                    className="w-8 h-8 rounded border border-border cursor-pointer"
                                    title="Custom color"
                                />
                                <input
                                    type="text"
                                    value={selectedColor}
                                    onChange={(e) => {
                                        const color = e.target.value;
                                        setSelectedColor(color);
                                        handleColorCodeInput(color);
                                    }}
                                    placeholder="#000000, rgb(255,0,0), hsl(0,100%,50%)"
                                    className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Supports: HEX, RGB, RGBA, HSL, HSLA
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Gradient Presets */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {gradientPresets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => handleGradientChange(preset.colors, preset.angle)}
                                    className="h-8 rounded-md border-2 border-border hover:border-primary transition-colors relative group"
                                    style={{
                                        background: `linear-gradient(${preset.angle}deg, ${preset.colors[0]}, ${preset.colors[1]})`
                                    }}
                                    title={preset.name}
                                >
                                    <div className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </button>
                            ))}
                        </div>

                        {/* Custom Gradient Controls */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={gradientPresets[0].colors[0]}
                                    onChange={(e) => {
                                        const newColors = [e.target.value, gradientPresets[0].colors[1]];
                                        handleGradientChange(newColors, gradientAngle);
                                    }}
                                    className="w-8 h-8 rounded border border-border cursor-pointer"
                                    title="Start color"
                                />
                                <span className="text-xs text-muted-foreground">→</span>
                                <input
                                    type="color"
                                    value={gradientPresets[0].colors[1]}
                                    onChange={(e) => {
                                        const newColors = [gradientPresets[0].colors[0], e.target.value];
                                        handleGradientChange(newColors, gradientAngle);
                                    }}
                                    className="w-8 h-8 rounded border border-border cursor-pointer"
                                    title="End color"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={gradientAngle}
                                    onChange={(e) => {
                                        const angle = parseInt(e.target.value);
                                        setGradientAngle(angle);
                                        handleGradientChange(gradientPresets[0].colors, angle);
                                    }}
                                    className="flex-1"
                                />
                                <span className="text-xs text-muted-foreground w-8">{gradientAngle}°</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Adjust angle: 0° = right, 90° = down, 180° = left, 270° = up
                            </p>
                        </div>
                    </>
                )}
            </div>

                    </div>
    );
}
