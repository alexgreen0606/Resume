import { useEffect, useState } from 'react';
import { getTextUrl } from '../utils/textUtils';

interface TechStackSkill {
    title: string;
    strength: number;
}

const techStackFiles = import.meta.glob('../docs/**/techStack.txt');

const useTechStackReader = (paths?: readonly string[]) => {

    const [skills, setSkills] = useState<TechStackSkill[] | undefined>(undefined);

    const selectedPaths = paths ?? Object.keys(techStackFiles);
    const pathsKey = selectedPaths.join('\0');

    useEffect(() => {
        let cancelled = false;

        const readTechStacks = async () => {
            try {
                const techStacks = await Promise.all(selectedPaths
                    .map(path => techStackFiles[path])
                    .filter((source): source is () => Promise<unknown> => Boolean(source))
                    .map(async source => {
                        const url = await getTextUrl(source);
                        if (!url) return [];

                        const response = await fetch(url);
                        if (!response.ok) throw new Error(`Unable to read tech stack: ${response.status}`);

                        return (await response.text())
                            .split('\n')
                            .map(line => line.trim())
                            .filter(Boolean)
                            .map(line => {
                                const match = line.match(/^(.*?)\s+(\d+)$/);
                                return {
                                    title: match ? match[1].trim() : line,
                                    strength: match ? Number(match[2]) : 0,
                                };
                            });
                    }));

                const skillCounts = new Map<string, number>();
                techStacks.flat().forEach(skill => {
                    skillCounts.set(skill.title, (skillCounts.get(skill.title) ?? 0) + skill.strength);
                });

                const sortedSkills = Array.from(skillCounts, ([title, strength]) => ({ title, strength }))
                    .sort((firstSkill, secondSkill) =>
                        secondSkill.strength - firstSkill.strength || firstSkill.title.localeCompare(secondSkill.title)
                    );

                if (!cancelled) setSkills(sortedSkills);
            } catch (error) {
                console.error('Unable to load tech stack data', error);
                if (!cancelled) setSkills([]);
            }
        };

        setSkills(undefined);
        readTechStacks();

        return () => { cancelled = true; };
    }, [pathsKey]);

    return skills;
};

export default useTechStackReader;
